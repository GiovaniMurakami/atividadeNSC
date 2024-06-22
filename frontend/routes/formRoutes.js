const express = require("express");
const router = express.Router();
const FormController = require("../controllers/FormController");

router.get("/form", FormController.index);

module.exports = router;
