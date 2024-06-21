const mongoose = require("mongoose");
require("dotenv").config();

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
    } catch (err) {
        console.log("Error: ", err);
    }
};

module.exports = connectMongo;
