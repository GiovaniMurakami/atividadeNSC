const express = require("express");
const router = express.Router();
const FormController = require("../controllers/FormController");

router.get("/form", FormController.index);
router.get("/sucess", FormController.sucess);

module.exports = router;
