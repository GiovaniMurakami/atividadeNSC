const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contactController.js");

router.post("/submit", contactController.submit);

module.exports = router;
