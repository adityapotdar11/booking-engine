const JWT = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
    // Get token from header
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({
            status: false,
            message: "Access denied!",
        });
    }
    try {
        const decoded = JWT.verify(token, jwtSecret);
        let user = await User.findById(decoded.user.id);
        if (!user) {
            return res.status(401).json({
                status: false,
                message: "Access denied!",
            });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({
            status: false,
            message: "Access denied!",
        });
    }
};

module.exports = authMiddleware;
