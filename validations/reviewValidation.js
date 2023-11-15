const Joi = require("joi");

const createReviewValidation = async (req, res, next) => {
    try {
        const JoiSchema = Joi.object({
            tour: Joi.string().required(),
            review: Joi.string().max(1000).required(),
            rating: Joi.number().required(),
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

const updateReviewValidation = async (req, res, next) => {
    try {
        const JoiSchema = Joi.object({
            review: Joi.string().max(1000).required(),
            rating: Joi.number().required(),
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

module.exports = { createReviewValidation, updateReviewValidation };
