const express = require("express");
const {
    createTour,
    viewAllTours,
    viewTour,
    updateTour,
} = require("../controllers/tourController");
const { createValidation } = require("../validations/tourValidations");

const router = express.Router();

router.post("/create", createValidation, createTour);
router.get("/", viewAllTours);
router.get("/:slug", viewTour);
router.post("/update/:id", createValidation, updateTour);

module.exports = router;
