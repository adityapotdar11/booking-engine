const Tour = require("../models/Tour");
const { v4: uuidv4 } = require("uuid");

const createTour = async (req, res) => {
    try {
        const { name, duration, maxGroupSize, price, description, image } =
            req.body;
        let tour = await Tour.findOne({ name, userId: req.user.id });
        if (tour) {
            throw new Error("Tour already exists!");
        }

        const slug = name.split(" ").join("-").toLowerCase() + "-" + uuidv4();

        const payload = {
            name,
            slug,
            duration,
            maxGroupSize,
            price,
            description,
            image,
            user: req.user.id,
        };

        tour = new Tour(payload);

        await tour.save();

        return res.status(201).json({
            status: true,
            message: "Tour created successfully!",
        });
    } catch (error) {
        return res.status(error.statusCode || 400).json({
            status: false,
            message: error.message || "Something went wrong!",
        });
    }
};

const viewAllTours = async (req, res) => {
    try {
        const tours = await Tour.find();
        return res.status(200).json({
            status: true,
            message: "Tours fetched successfully!",
            data: tours,
        });
    } catch (error) {
        return res.status(error.statusCode || 400).json({
            status: false,
            message: error.message || "Something went wrong!",
        });
    }
};

const viewTour = async (req, res) => {
    try {
        const tour = await Tour.findOne({ slug: req.params.slug });
        return res.status(200).json({
            status: true,
            message: "Tour fetched successfully!",
            data: tour,
        });
    } catch (error) {
        return res.status(error.statusCode || 400).json({
            status: false,
            message: error.message || "Something went wrong!",
        });
    }
};

const updateTour = async (req, res) => {
    try {
        const { name, duration, maxGroupSize, price, description, image } =
            req.body;
        let tour = await Tour.findOne({
            _id: req.params.id,
        }).populate("user");

        if (!tour) {
            throw new Error("Tour not found!");
        }

        if (tour.user.id !== req.user.id) {
            throw new Error("You cannot edit this tour!");
        }

        const slug = name.split(" ").join("-").toLowerCase() + "-" + uuidv4();

        const payload = {
            name,
            duration,
            maxGroupSize,
            price,
            description,
            image,
        };
        if (tour.name !== name) {
            payload.slug = slug;
        }

        await Tour.findByIdAndUpdate(tour.id, payload, {
            useFindAndModify: false,
        });

        return res.status(200).json({
            status: true,
            message: "Tour updated successfully!",
        });
    } catch (error) {
        return res.status(error.statusCode || 400).json({
            status: false,
            message: error.message || "Something went wrong!",
        });
    }
};

module.exports = { createTour, viewAllTours, viewTour, updateTour };
