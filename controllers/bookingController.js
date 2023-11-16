const BookingDetails = require("../models/BookingDetails");
const stripe = require("stripe")("sk_test_PoYnFX3hEP3vXKuNdTTU34nH");
const Tour = require("../models/Tour");
const bookTour = async (req, res) => {
    try {
        const { tourId, paymentMethod } = req.body;

        const tour = await Tour.findById(tourId).populate("user");

        if (!tour) {
            throw new Error("Tour not found!");
        }

        if (req.user.id === tour.user.id) {
            throw new Error("You cannot book your own tour!");
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(tour.price) * 100,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: "never",
            },
        });

        const paymentConfirm = await stripe.paymentIntents.confirm(
            paymentIntent.id,
            {
                payment_method: paymentMethod,
            }
        );

        if (paymentConfirm.status === "succeeded") {
            const payload = {
                user: req.user.id,
                tour: tourId,
                price: tour.price,
                paymentId: paymentConfirm.id,
            };

            const bookingDetails = new BookingDetails(payload);

            await bookingDetails.save();

            return res.status(200).json({
                status: true,
                message: "Booking successful!",
            });
        } else {
            throw new Error("Cannot confirm payment!");
        }
    } catch (error) {
        return res.status(error.statusCode || 400).json({
            status: false,
            message: error.message || "Something went wrong!",
        });
    }
};

module.exports = { bookTour };
