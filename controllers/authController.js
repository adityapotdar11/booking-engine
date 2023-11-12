const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { jwtSecret } = require("../config/config");

const registerUser = async (req, res) => {
    try {
        const { email, firstName, lastName, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            throw new Error("User already exists!");
        }

        const salt = await bcrypt.genSalt(10);

        const hash = await bcrypt.hash(password, salt);

        const payload = {
            email,
            firstName,
            lastName,
            password: hash,
        };

        user = new User(payload);

        await user.save();

        return res.status(201).json({
            status: true,
            message: "User registered successfully!",
        });
    } catch (error) {
        return res.status(error.statusCode || 400).json({
            status: false,
            message: error.message || "Something went wrong!",
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid credentials!");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error("Invalid credentials!");
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        const token = await jwt.sign(payload, jwtSecret, { expiresIn: "1h" });

        return res.status(200).json({
            status: true,
            message: "User logged in successfully!",
            token: token,
        });
    } catch (error) {
        return res.status(error.statusCode || 400).json({
            status: false,
            message: error.message || "Something went wrong!",
        });
    }
};

module.exports = { registerUser, loginUser };
