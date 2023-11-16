const express = require("express");
const {
    registerUser,
    loginUser,
    forgotPassword,
    confirmUser,
} = require("../controllers/authController");
const {
    registerValidation,
    loginValidation,
    forgotPasswordValidation,
    confirmUserValidation,
} = require("../validations/authValidations");

const router = express.Router();

router.post("/sign-up", registerValidation, registerUser);
router.post("/sign-in", loginValidation, loginUser);
router.post("/forgot-password", forgotPasswordValidation, forgotPassword);
router.post("/confirm-user/:slug", confirmUserValidation, confirmUser);

module.exports = router;
