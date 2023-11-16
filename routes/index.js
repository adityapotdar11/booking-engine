const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const authRoutes = require("./authRoutes");
const tourRoutes = require("./tourRoutes");
const bookingRoutes = require("./bookingRoutes");
const reviewRoutes = require("./reviewRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/tours", authMiddleware, tourRoutes);
router.use("/bookings", authMiddleware, bookingRoutes);
router.use("/reviews", authMiddleware, reviewRoutes);

module.exports = router;
