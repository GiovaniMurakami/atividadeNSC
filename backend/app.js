const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

//ROUTES
const contactRoutes = require("./routes/contactRoutes");

//MONGO CONNECTION
const connectMongo = require("./services/connectMongo");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/contact/", contactRoutes);

connectMongo()
    .then(() => {
        app.listen(3000, () => {
            console.log("serv ok");
        });
    })
    .catch((err) => {
        console.error("Erro: ", err);
    });
