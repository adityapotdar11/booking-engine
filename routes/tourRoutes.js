const express = require("express");
const { createTour } = require("../controllers/tourController");
const { createValidation } = require("../validations/tourValidations");

const router = express.Router();

router.post("/create", createValidation, createTour);

module.exports = router;
