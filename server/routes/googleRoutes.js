const express = require("express");
const router = express.Router();
const db = require("../config/connection");
const { google } = require("googleapis");
require("dotenv").config();
const path = require("path");

// Helper function to create a unit
async function create_unit(name, origin_url) {
  try {
    // Create slug from the name
    let trimmedSlug = name.trim();
    const slug = trimmedSlug.replace(/\s+/g, "-").toLowerCase();
    const [create_unit] = await db
      .promise()
      .query(`INSERT INTO unit (name, slug, origin_url) VALUES (?, ?, ?)`, [
        name,
        slug,
        origin_url,
      ]);

    return create_unit;
  } catch (err) {
    console.error("Error inserting unit into database:", err);
    throw err;
  }
}

// Helper function to create page count for a unit
async function create_page_count(unit_id) {
  // Update the page count for the unit
  await db.promise().query(
    `UPDATE unit 
     SET page_count = (SELECT COUNT(*) FROM page WHERE unit_id = ?) 
     WHERE id = ?`,
    [unit_id, unit_id]
  );
}

// Set up OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Route to initiate OAuth2 flow, first API you hit to authenticate
// ROUTE = /api/google/auth
router.get("/auth", (req, res) => {
  try {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/analytics.readonly"],
    });

    return res.status(200).json({ authUrl });
  } catch (error) {
    console.error("Error in /auth/google route:", error);
    return res.status(500).json({
      message: "An error occurred while initiating the OAuth flow",
      error: error.message,
    });
  }
});

// OAuth2 callback route
// ROUTE = /api/google/oauth2callback
router.get("/oauth2callback", async (req, res) => {
  const code = req.query.code;

  if (!code) {
    console.error("No code found in the query parameters");
    return res.status(400).send("Missing code in callback");
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    if (!tokens) {
      console.error("No tokens received from Google");
      return res.status(500).send("Token exchange failed");
    }

    oauth2Client.setCredentials(tokens);

    req.session.access_token = tokens.access_token;
    req.session.refresh_token = tokens.refresh_token;

    // Redirect to /oauth-success page on the client side after setting tokens in session
    res.redirect(`http://localhost:3000/oauth-success`);
  } catch (error) {
    console.error("Error during OAuth2 callback:", error);
    res.status(500).send("Authentication failed");
  }
});

router.get("/oauth-success", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "oauth-success.html"));
});

router.get("/auth-check", (req, res) => {
  if (req.session && req.session.access_token) {
    return res.status(200).json({ authenticated: true });
  } else {
    return res.status(200).json({ authenticated: false });
  }
});

// // ROUTE = /api/google/create
router.post("/create", async (req, res) => {
  try {
    const { access_token } = req.session;
    const {
      unit_name,
      origin_url,
      property_id,
      url_slug,
      start_date,
      end_date,
    } = req.body;
    if (!access_token) {
      return res.status(401).json({
        message: "No access token provided. Please authenticate first.",
      });
    }

    //create the new unit using the helper function
    const unit = await create_unit(unit_name, origin_url);
    const unit_id = unit.insertId;

    // Prepare the request to Google Analytics 4 API
    const GA4_ENDPOINT = `https://analyticsdata.googleapis.com/v1beta/properties/${property_id}:runReport`;

    // create the base postBody object without the dimensionFilter
    const basePostBody = {
      dateRanges: [{ startDate: start_date, endDate: end_date }],
      dimensions: [{ name: "pageTitle" }, { name: "fullPageUrl" }],
      metrics: [{ name: "screenPageViews" }],
      dimensionFilter: {
        andGroup: {
          expressions: [
            {
              filter: {
                fieldName: "pagePath",
                stringFilter: {
                  matchType: "BEGINS_WITH",
                  value: url_slug,
                  caseSensitive: false,
                },
              },
            },
            // Exclude pages with '?' in the query string
            {
              notExpression: {
                filter: {
                  fieldName: "pagePathPlusQueryString",
                  stringFilter: {
                    matchType: "CONTAINS",
                    value: "?",
                  },
                },
              },
            },
            // Exclude pages that start with 'wcm'
            {
              notExpression: {
                filter: {
                  fieldName: "fullPageUrl",
                  stringFilter: {
                    matchType: "PARTIAL_REGEXP",
                    value: "^(https?://)?(wcm|\\d+)",
                  },
                },
              },
            },
            {
              notExpression: {
                filter: {
                  fieldName: "fullPageUrl",
                  stringFilter: {
                    matchType: "FULL_REGEXP",
                    value: "^https?://[0-9]",
                  },
                },
              },
            },
          ],
        },
      },
    };

    // stringify the final postBody
    const postBody = JSON.stringify(basePostBody);

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        "Content-Length": postBody.length,
      },
      body: postBody,
    };

    // Make the request to Google Analytics 4 API
    const response = await fetch(GA4_ENDPOINT, options);

    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }

    const data_from_google = await response.json();

    // Process rows in batches of 10
    const BATCH_SIZE = 10;
    const created_pages = [];

    for (let i = 0; i < data_from_google.rows.length; i += BATCH_SIZE) {
      const batch = data_from_google.rows.slice(i, i + BATCH_SIZE);

      const batch_results = await Promise.allSettled(
        batch.map(async (row) => {
          const name = row.dimensionValues[0].value || "Unknown";
          let link = row.dimensionValues[1].value || "Unknown";

          // Remove trailing slashes from the link
          link = link.replace(/\/+$/, "");

          const page_views = parseInt(row.metricValues[0].value, 10) || 0;

          // Insert the page into the database
          const [result] = await db
            .promise()
            .query(
              `INSERT INTO page (name, page_views, link, unit_id) VALUES (?, ?, ?, ?)`,
              [name, page_views, link, unit_id]
            );

          // Return the created page details
          return {
            id: result.insertId,
            name,
            page_views,
            link,
            unit_id,
          };
        })
      );

      // Add the batch results to the overall created_pages array
      created_pages.push(...batch_results);
    }

    // Update the page count after processing all batches
    const pageCount = await create_page_count(unit_id);

    // Respond with the result
    res.status(201).json({
      message: "Created unit and pages!",
      unit: unit,
      pages: created_pages,
      page_count: pageCount,
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occured while processing this request.",
      error: err.message,
    });
  }
});

module.exports = router;
