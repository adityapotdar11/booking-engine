const registerUser = async (req, res) => {
    return res.status(200).json({
        status: true,
        message: "User registered successfully!",
    });
};

module.exports = { registerUser };
