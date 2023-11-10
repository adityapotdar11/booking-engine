const mongoose = require("mongoose");
const { databaseURL } = require("./config");

const connectDB = async () => {
    try {
        await mongoose.connect(databaseURL);
        console.log("Database Connected Successfully!!!");
    } catch (err) {
        console.log("Could not connect to the database!", err.message);
        // Exit for error
        process.exit(1);
    }
};

module.exports = connectDB;
