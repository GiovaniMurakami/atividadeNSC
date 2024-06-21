const StatusErr = require("../../helpers/StatusErr");
const { StatusAccept } = require("../../helpers/StatusAccept");
const Contact = require("../../models/contactSchema");

async function execute({ name, email, message }) {
    try {
        validade({ name, email, message });

        const reqContact = createContact({ name, email, message });

        await reqContact.save();

        return StatusAccept({
            err: null,
            status: 201,
            msg: "Contact saved",
        });
    } catch (err) {
        console.log(err);
        return {
            err: true,
            status: err.status || 500,
            msg: err.msg || "Unknown error, try again later",
        };
    }
}

function validade({ name, email, message }) {
    //Validação se campo existe
    if (!name || !email || !message) {
        throw new StatusErr("Todos os campos são obrigatórios", 400);
    }

    //Validação tipagem do campo
    if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof message !== "string"
    ) {
        throw new StatusErr("Todos os campos devem ser do tipo 'texto'", 400);
    }

    //Validação tamanho nome
    if (name.length < 3) {
        throw new StatusErr(
            "O campo 'nome' deve conter pelo menos 3 caracteres",
            400
        );
    }

    //Validação email
    if (!email.match(/^[^]+@[^]+\.[a-z]{2,3}$/)) {
        throw new StatusErr("O campo 'email' deve ser um email válido", 400);
    }

    //Validação tamanho mensagem
    if (message.length < 10) {
        throw new StatusErr(
            "O campo 'mensagem' deve conter pelo menos 10 caracteres"
        );
    }
}

function createContact({ name, email, message }) {
    const contact = new Contact({
        name,
        email,
        message,
    });
    return contact;
}

module.exports = { execute };
