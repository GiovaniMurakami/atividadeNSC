const mongoose = require("mongoose");
require("dotenv").config();

/**
 * Conecta ao MongoDB usando uma STRING de CONEXÃO
 * @async
 * @function connectMongo
 * @throws Irá enviar um erro caso ocorra algum problema.
 */
const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Successfully connected to MongoDB");
    } catch (err) {
        console.log("Error: ", err);
    }
};

module.exports = connectMongo;
