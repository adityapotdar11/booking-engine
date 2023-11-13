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
            userId: req.user.id,
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

module.exports = { createTour };
