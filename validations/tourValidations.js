const Joi = require("joi");

const createValidation = async (req, res, next) => {
    try {
        const JoiSchema = Joi.object({
            name: Joi.string().required(),
            duration: Joi.string().required(),
            maxGroupSize: Joi.number().required(),
            price: Joi.number().required(),
            description: Joi.string().max(1000).required(),
            image: Joi.string().uri().required(),
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

module.exports = { createValidation };
