const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        tour: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "tours",
        },
        review: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const review = new mongoose.model("reviews", ReviewSchema);

module.exports = review;
