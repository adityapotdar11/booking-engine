const Joi = require("joi");

const registerValidation = (req, res, next) => {
    try {
        const JoiSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string()
                .pattern(new RegExp("^[a-zA-Z0-9]{8,20}$"))
                .required(),
            confirmPassword: Joi.ref("password"),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
        })
            .with("password", "confirmPassword")
            .options({ abortEarly: false });
        const validate = JoiSchema.validate(req.body);
        if (validate.error) {
            return res.status(400).json({
                status: false,
                message: "Validation error!",
                error: validate.error.details,
            });
        } else {
            next();
        }
    } catch (error) {
        return res.status(error.statusCode || 400).json({
            status: false,
            message: error.message || "Something went wrong!",
        });
    }
};

const loginValidation = (req, res, next) => {
    try {
        const JoiSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }).options({ abortEarly: false });
        const validate = JoiSchema.validate(req.body);
        if (validate.error) {
            return res.status(400).json({
                status: false,
                message: "Validation error!",
                error: validate.error.details,
            });
        } else {
            next();
        }
    } catch (error) {
        return res.status(error.statusCode || 400).json({
            status: false,
            message: error.message || "Something went wrong!",
        });
    }
};

const forgotPasswordValidation = (req, res, next) => {
    try {
        const JoiSchema = Joi.object({
            email: Joi.string().email().required(),
        }).options({ abortEarly: false });
        const validate = JoiSchema.validate(req.body);
        if (validate.error) {
            return res.status(400).json({
                status: false,
                message: "Validation error!",
                error: validate.error.details,
            });
        } else {
            next();
        }
    } catch (error) {
        return res.status(error.statusCode || 400).json({
            status: false,
            message: error.message || "Something went wrong!",
        });
    }
};

const confirmUserValidation = (req, res, next) => {
    try {
        const JoiSchema = Joi.object({
            password: Joi.string()
                .pattern(new RegExp("^[a-zA-Z0-9]{8,20}$"))
                .required(),
            confirmPassword: Joi.ref("password"),
        })
            .with("password", "confirmPassword")
            .options({ abortEarly: false });
        const validate = JoiSchema.validate(req.body);
        if (validate.error) {
            return res.status(400).json({
                status: false,
                message: "Validation error!",
                error: validate.error.details,
            });
        } else {
            next();
        }
    } catch (error) {
        return res.status(error.statusCode || 400).json({
            status: false,
            message: error.message || "Something went wrong!",
        });
    }
};

module.exports = {
    registerValidation,
    loginValidation,
    forgotPasswordValidation,
    confirmUserValidation,
};
