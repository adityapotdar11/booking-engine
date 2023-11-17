const Review = require("../models/Review");
const Tour = require("../models/Tour");
var ObjectId = require("mongoose").Types.ObjectId;

const createReview = async (req, res) => {
    try {
        const { tour, review, rating } = req.body;

        if (parseInt(rating) > 5 || parseInt(rating) === 0) {
            throw new Error("Invalid rating!");
        }
        const tourObj = await Tour.findById(tour);
        if (!tourObj) {
            return res.status(400).json({
                status: true,
                message: "Tour not found!",
            });
        }
        const payload = {
            tour,
            review,
            rating,
            user: req.user.id,
        };

        let reviewObj = new Review(payload);

        await reviewObj.save();

        const reviews = await Review.find({
            tour: new ObjectId(tourObj.id),
        });

        let count = 0;
        let ratings = 0;

        if (reviews.length) {
            await reviews.map((value) => {
                ratings += Number(value.rating);
                count++;
            });
            const payload = {
                ratingsAverage: (ratings / count).toFixed(2),
            };
            await Tour.findByIdAndUpdate(tour, payload, {
                useFindAndModify: false,
            });
        }

        return res.status(201).json({
            status: true,
            message: "Review added successfully!",
        });
    } catch (error) {
        return res.status(error.statusCode || 400).json({
            status: false,
            message: error.message || "Something went wrong!",
        });
    }
};

const getAllReviews = async (req, res) => {
    try {
        const tour = await Tour.findOne({ slug: req.params.slug });
        if (!tour) {
            return res.status(400).json({
                status: true,
                message: "Tour not found!",
            });
        }
        const reviews = await Review.find({
            tour: new ObjectId(tour._id),
        }).populate({ path: "user", select: "firstName lastName" });
        return res.status(200).json({
            status: true,
            message: "Reviews fetched successfully!",
            data: reviews,
        });
    } catch (error) {
        return res.status(error.statusCode || 400).json({
            status: false,
            message: error.message || "Something went wrong!",
        });
    }
};

const getSingleReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        return res.status(200).json({
            status: true,
            message: "Review fetched successfully!",
            data: review,
        });
    } catch (error) {
        return res.status(error.statusCode || 400).json({
            status: false,
            message: error.message || "Something went wrong!",
        });
    }
};

const updateReview = async (req, res) => {
    try {
        const { review, rating } = req.body;

        if (parseInt(rating) > 5 || parseInt(rating) === 0) {
            throw new Error("Invalid rating!");
        }

        let reviewObj = await Review.findById(req.params.id).populate(
            "user",
            "tour"
        );
        if (!reviewObj) {
            throw new Error("Review not Found!");
        }
        if (req.user.id != reviewObj.user.id) {
            throw new Error("You cannot edit this review!");
        }
        const payload = {
            review,
            rating,
        };

        await Review.findByIdAndUpdate(reviewObj.id, payload, {
            useFindAndModify: false,
        });

        const reviews = await Review.find({
            tour: new ObjectId(reviewObj.tour._id),
        });

        let count = 0;
        let ratings = 0;

        if (reviews.length) {
            await reviews.map((value) => {
                ratings += Number(value.rating);
                count++;
            });
            const payload = {
                ratingsAverage: (ratings / count).toFixed(2),
            };
            await Tour.findByIdAndUpdate(reviewObj.tour._id, payload, {
                useFindAndModify: false,
            });
        }

        return res.status(200).json({
            status: true,
            message: "Review updated successfully!",
        });
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 400).json({
            status: false,
            message: error.message || "Something went wrong!",
        });
    }
};

const deleteReview = async (req, res) => {
    try {
        let reviewObj = await Review.findById(req.params.id).populate(
            "user",
            "tour"
        );

        if (!reviewObj) {
            throw new Error("Review not Found!");
        }

        if (req.user.id != reviewObj.user.id) {
            throw new Error("You cannot delete this review!");
        }

        await Review.findByIdAndDelete(reviewObj.id);

        const reviews = await Review.find({
            tour: new ObjectId(reviewObj.tour._id),
        });

        let count = 0;
        let ratings = 0;

        if (reviews.length) {
            await reviews.map((value) => {
                ratings += Number(value.rating);
                count++;
            });
            const payload = {
                ratingsAverage: (ratings / count).toFixed(2),
            };
            await Tour.findByIdAndUpdate(reviewObj.tour._id, payload, {
                useFindAndModify: false,
            });
        }

        return res.status(200).json({
            status: true,
            message: "Review deleted successfully!",
        });
    } catch (error) {
        return res.status(error.statusCode || 400).json({
            status: false,
            message: error.message || "Something went wrong!",
        });
    }
};

module.exports = {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
};
