const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const authRoutes = require("./authRoutes");
const tourRoutes = require("./tourRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use(authMiddleware);
router.use("/tours", tourRoutes);

module.exports = router;
