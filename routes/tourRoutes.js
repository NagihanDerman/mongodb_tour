const express = require("express");
const { getAllTours, createTours, getTour, deleteTour, updateTour,  aliasTopTours, getTourStats,getMonthlyPlan} = require("../controllers/tourController");
const formatQuery = require("../middleware/formatQuery");

const router = express.Router();

// ---- routes -----
router.route("/top-tours").get(aliasTopTours, getAllTours);//alias (yeniden adlandirma icin)
router.route("/tour-stats").get(getTourStats); //raporlama icin
router.route("/monthly-plan/:year").get(getMonthlyPlan);
router.route("/")
  .get(formatQuery, getAllTours)      // GET request to /tours
  .post(createTours);     // POST request to /tours

// Dynamic route for /tours/:id (getTour, deleteTours, and updateTours)
router.route("/:id")
  .get(getTour)          // GET request to /tours/:id
  .delete(deleteTour)   // DELETE request to /tours/:id
  .patch(updateTour);   // PATCH request to /tours/:id

module.exports = router;
