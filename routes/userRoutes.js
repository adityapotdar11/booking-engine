const express = require("express");
const { updateUser } = require("../controllers/userController");
const { updateValidation } = require("../validations/userValidations");

const router = express.Router();

router.post("/update", updateValidation, updateUser);

module.exports = router;
