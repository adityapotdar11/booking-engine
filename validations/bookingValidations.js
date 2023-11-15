const Joi = require("joi");

const tourBookingValidation = async (req, res, next) => {
    try {
        const JoiSchema = Joi.object({
            paymentMethod: Joi.string().required(),
            tourId: Joi.string().required(),
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

module.exports = { tourBookingValidation };
