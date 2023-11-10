const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    databaseURL: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
};
