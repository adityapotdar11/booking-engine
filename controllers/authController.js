const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");
const TempUser = require("../models/TempUser");
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

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found!");
        }
        const slug = uuidv4();
        const payload = {
            user: user.id,
            slug,
        };

        const tempUser = new TempUser(payload);
        await tempUser.save();

        return res.status(200).json({
            status: true,
            message: "Link sent to mail",
            data: {
                url: "http://localhost:5000/api/auth/confirm-user/" + slug,
            },
        });
    } catch (error) {
        return res.status(error.statusCode || 400).json({
            status: false,
            message: error.message || "Something went wrong!",
        });
    }
};

const confirmUser = async (req, res) => {
    try {
        const tempUser = await TempUser.findOne({
            slug: req.params.slug,
        }).populate("user");
        if (!tempUser) {
            throw new Error("User not found!");
        }
        const currDate = new Date();
        const createdDate = new Date(tempUser.createdAt);
        const diffTime = Math.abs(currDate - createdDate);
        const diffSec = Math.ceil(diffTime / 1000);
        if (diffSec > 600) {
            throw new Error("Link expired!");
        }

        const { password } = req.body;

        const salt = await bcrypt.genSalt(10);

        const hash = await bcrypt.hash(password, salt);

        const payload = {
            password: hash,
        };

        await User.findByIdAndUpdate(tempUser.user.id, payload, {
            useFindAndModify: false,
        });

        return res.status(200).json({
            status: true,
            message: "Password updated successfully!",
        });
    } catch (error) {
        return res.status(error.statusCode || 400).json({
            status: false,
            message: error.message || "Something went wrong!",
        });
    }
};

module.exports = { registerUser, loginUser, forgotPassword, confirmUser };
