const mongoose = require("mongoose");

Schema = mongoose.Schema;
const TourSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        duration: {
            type: String,
            required: true,
        },
        maxGroupSize: {
            type: Number,
            required: true,
        },
        ratingsAverage: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            default: "",
        },
        image: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    },
    { timestamps: true }
);

const tour = new mongoose.model("tours", TourSchema);

module.exports = tour;
