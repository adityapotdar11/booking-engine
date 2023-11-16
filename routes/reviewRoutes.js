const express = require("express");
const {
    createReviewValidation,
    updateReviewValidation,
} = require("../validations/reviewValidation");
const {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
} = require("../controllers/reviewController");

const router = express.Router();

router.post("/create", createReviewValidation, createReview);
router.get("/:slug", getAllReviews);
router.get("/single/:id", getSingleReview);
router.post("/update/:id", updateReviewValidation, updateReview);
router.delete("/delete/:id", deleteReview);

module.exports = router;
