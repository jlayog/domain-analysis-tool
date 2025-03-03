const express = require("express");
const router = express.Router();
const db = require("../config/connection");

// update multiple pages at a time
// ROUTE = /api/:unit_name/update_pages
router.patch("/:unit_name/update_pages", async (req, res) => {
  try {
    const { unit_name } = req.params;
    let page_updates = req.body; // This should be an array of page updates

    // Check if page_updates is an array
    if (!Array.isArray(page_updates)) {
      console.error("page_updates is not an array:", page_updates);
      return res
        .status(400)
        .json({ message: "Expected an array of page updates" });
    }

    // First, find the unit ID based on the unit name
    const [unit_data] = await db
      .promise()
      .query(`SELECT id FROM unit WHERE slug = ?`, [unit_name]);

    if (!unit_data || unit_data.length === 0) {
      return res.status(404).json({ message: "Unit not found" });
    }
    const unit_id = unit_data[0].id;

    // Process each page update
    for (const update of page_updates) {
      const { page_id, priority_name, notes, to_keep, audience_name } = update;

      if (!page_id) {
        return res
          .status(400)
          .json({ message: "Missing required fields in page update" });
      }

      // Update the page
      await db
        .promise()
        .query(
          `UPDATE page SET page_priority = ?, page_audience = ?, notes = ?, to_keep = ? WHERE page.id = ? AND page.unit_id = ?`,
          [priority_name, audience_name, notes, to_keep, page_id, unit_id]
        );
    }

    res.status(200).json({ message: "All pages updated successfully" });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while updating pages in the database.",
      error: err.message,
    });
  }
});

// get all info for all of the pages for 1 unit
// ROUTE = /api/:unit_name/pages
router.get("/:unit_name/pages", async (req, res) => {
  try {
    const { unit_name } = req.params;

    // First, find the unit ID based on the unit name
    const [unit_data] = await db
      .promise()
      .query(`SELECT id FROM unit WHERE slug = ?`, [unit_name]);

    if (!unit_data || unit_data.length === 0) {
      return res.status(404).json({ message: "Unit not found" });
    }
    const unit_id = unit_data[0].id;

    const [pages] = await db.promise().query(
      `SELECT page.*, unit.name AS unit_name
        FROM page
        LEFT JOIN unit ON page.unit_id = unit.id
        WHERE page.unit_id = ?`,
      [unit_id]
    );

    if (pages.length === 0) {
      return res
        .status(200)
        .json({ message: "No pages found for this unit", pages: [] });
    }

    res.status(200).json(pages);
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while fetching pages",
      error: err.message,
    });
  }
});

module.exports = router;
