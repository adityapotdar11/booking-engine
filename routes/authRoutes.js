const express = require("express");
const { registerUser } = require("../controllers/authController");

const router = express.Router();

router.post("/sign-up", registerUser);

module.exports = router;
