const saveContact = require("../useCases/contact/saveContact");

class contactController {
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
