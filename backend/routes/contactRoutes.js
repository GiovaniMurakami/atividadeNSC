const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contactController.js");

/**
 * Rota para tratar e salvar o formulário de contato.
 * @name POST /submit
 * @function
 * @memberof module:router
 * @inner
 * @param {express.Request} req - O objeto de requisição.
 * @param {express.Response} res - A resposta da requisição.
 */
router.post("/submit", contactController.submit);

module.exports = router;
