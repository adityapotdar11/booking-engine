const mongoose = require("mongoose");

const TempUserSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        slug: {
            type: String,
            unique: true,
            required: true,
        },
    },
    { timestamps: true }
);

const tempUser = new mongoose.model("tempUsers", TempUserSchema);

module.exports = tempUser;
