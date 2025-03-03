const express = require("express");
const router = express.Router();
const db = require("../config/connection");

// view all units
//ROUTE = /api/units
router.get("/", async (req, res) => {
  try {
    const [units] = await db.promise().query(`SELECT * FROM unit`);
    res.status(200).json(units);
  } catch (err) {
    res.status(500).json({
      message: "An error occured while fetching all units.",
      error: err.message || "Unknown error",
    });
  }
});

// delete a unit and all the pages under it
// ROUTE = /api/units/delete
router.delete("/delete/:unit_id", async (req, res) => {
  try {
    const { unit_id } = req.params;
    if (!unit_id) {
      return res.status(400).json({ message: "Unit ID is required" });
    }

    // Start a transaction
    await db.promise().query("START TRANSACTION");

    try {
      // Delete associated pages
      await db.promise().query(`DELETE FROM page WHERE unit_id = ?`, [unit_id]);

      // Delete the unit
      await db.promise().query(`DELETE FROM unit WHERE id = ?`, [unit_id]);

      // Commit the transaction
      await db.promise().query("COMMIT");

      res.status(200).json({
        message: `Unit '${unit_id}' and all associated pages have been deleted successfully.`,
      });
    } catch (err) {
      // Rollback transaction on error
      await db.promise().query("ROLLBACK");
      console.error("Error during deletion:", err.message);
      res.status(500).json({
        message: "An error occurred while deleting the unit and pages.",
        error: err.message,
      });
    }
  } catch (err) {
    console.error("Error in /api/units/delete:", err.message);
    res.status(500).json({
      message: "An error occured while processing this request.",
      error: err.message,
    });
  }
});

module.exports = router;
