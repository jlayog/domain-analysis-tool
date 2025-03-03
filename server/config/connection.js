require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createPool({
  host: process.env.HOST || "host.docker.internal",
  user: process.env.DB_USER,
  port: process.env.PORT || 3360,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectTimeout: 10000,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Database debugging

// console.log("Connecting to DB with:", {
//   host: process.env.HOST,
//   user: process.env.DB_USER,
//   port: process.env.PORT,
//   database: process.env.DB_NAME,
// });

// db.getConnection((err, connection) => {
//   if (err) {
//     console.error("Database connection failed:", err);
//   } else {
//     console.log("Database connected successfully!");
//     connection.release();
//   }
// });

module.exports = db;

// TO RUN IN DOKER CONTAINER CHANGE host: "host.docker.internal",
