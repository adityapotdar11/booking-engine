const mongoose = require("mongoose");

const BookingDetailsSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        tour: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "tours",
        },
        price: {
            type: Number,
            required: true,
        },
        paymentId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const bookingDetails = new mongoose.model(
    "bookingDetails",
    BookingDetailsSchema
);

module.exports = bookingDetails;
