const User = require("../models/User");
const ObjectId = require("mongoose").model.ObjectId;

const updateUser = async (req, res) => {
    try {
        const { email, firstName, lastName } = req.body;
        let user = await User.findOne({
            email,
            _id: {
                $ne: req.user.id,
            },
        });
        if (user) {
            throw new Error("Email already exists!");
        }

        let payload = {
            email,
            firstName,
            lastName,
        };

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            payload.password = await bcrypt.hash(req.body.password, salt);
        }

        const id = req.user.id;

        await User.findByIdAndUpdate(id, payload, { useFindAndModify: false });

        return res.status(200).json({
            status: true,
            message: "User updated successfully!",
        });
    } catch (error) {
        return res.status(error.statusCode || 400).json({
            status: false,
            message: error.message || "Something went wrong!",
        });
    }
};

module.exports = { updateUser };
