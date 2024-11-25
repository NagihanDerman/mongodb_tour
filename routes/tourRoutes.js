const express = require("express");
const { getAllTours, createTours, getTour, deleteTour, updateTour } = require("../controllers/tourController");
const formatQuery = require("../middleware/formatQuery");

const router = express.Router();

// ---- routes -----

router.route("/")
  .get(formatQuery, getAllTours)      // GET request to /tours
  .post(createTours);     // POST request to /tours

// Dynamic route for /tours/:id (getTour, deleteTours, and updateTours)
router.route("/:id")
  .get(getTour)          // GET request to /tours/:id
  .delete(deleteTour)   // DELETE request to /tours/:id
  .patch(updateTour);   // PATCH request to /tours/:id

module.exports = router;
