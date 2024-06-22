const saveContact = require("../useCases/contact/saveContact");

class contactController {
    /**
     * Envia os parâmentros do formulário para o módulo de caso de uso - SaveContact.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} req.body - O corpo do objeto de requisição.
     * @param {string} req.body.name - Nome do usuário que iniciou a requisição.
     * @param {string} req.body.email - Email do usuário que iniciou a requisição.
     * @param {string} req.body.message - Mensagem do usuário que iniciou a requisição
     * @param {Object} res - O objeto de resposta.
     */
    static async submit(req, res) {
        try {
            const { name, email, message } = req.body;

            const { err, status, msg } = await saveContact.execute({
                name,
                email,
                message,
            });

            if (err) return res.status(status).json({ status, msg });

            res.status(status).json({ status, msg });
        } catch (err) {
            res.status(500).json({
                msg: "Error, try again later",
            });
        }
    }
}

module.exports = contactController;
