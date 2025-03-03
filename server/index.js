//import express and db connection
const express = require("express");
const app = express();
require("dotenv").config();
const session = require("express-session");
const port = 3001;
const db = require("./config/connection");
const unitRoutes = require("./routes/unitRoutes");
const pageRoutes = require("./routes/pageRoutes");
const googleRoutes = require("./routes/googleRoutes");
const path = require("path");

// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SECRET || "default-secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true when using HTTPS in production
      httpOnly: true, // Helps mitigate XSS attacks
      sameSite: "lax", // Allows cookies to be sent for same-origin requests },
    },
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Allow requests from this origin
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PATCH, POST, PUT, DELETE, OPTIONS"
  ); // Allowed HTTP methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allowed headers
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow cookies to be sent

  // Handle pre-flight requests (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // Pre-flight request is okay, no content needed
  }

  next(); // Continue processing the request
});

// Use the route files
app.use("/api/google", googleRoutes);
app.use("/api/units", unitRoutes);
app.use("/api", pageRoutes);

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack || err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

// starting the server
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
