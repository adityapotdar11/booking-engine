const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const authRoutes = require("./authRoutes");
const tourRoutes = require("./tourRoutes");
const bookingRoutes = require("./bookingRoutes");
const reviewRoutes = require("./reviewRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use(authMiddleware);
router.use("/tours", tourRoutes);
router.use("/booking", bookingRoutes);
router.use("/reviews", reviewRoutes);

module.exports = router;
