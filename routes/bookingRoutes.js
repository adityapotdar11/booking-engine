const express = require("express");
const { bookTour } = require("../controllers/bookingController");
const { tourBookingValidation } = require("../validations/bookingValidations");

const router = express.Router();

router.post("/create", tourBookingValidation, bookTour);

module.exports = router;
