const path = require("path");
const express = require("express");
const app = express();

app.use("/static", express.static(path.join(__dirname, "public/static")));

const formRoutes = require("./routes/formRoutes");

app.use("/", formRoutes);

app.listen(5000, () => {
    console.log("serv ok");
});
