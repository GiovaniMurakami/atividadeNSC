const StatusErr = require("../../helpers/StatusErr");
const { StatusAccept } = require("../../helpers/StatusAccept");
const Contact = require("../../models/contactSchema");

/**
 * Executa o fluxo de salvar os dados do contato {
 *  Primeiro: Ocorre a validação dos dados.
 *  Segundo: Cria um objeto modelo de Contato com os dados sanitizados.
 *  Terceiro: Salva o objeto de modelo no banco de dados.
 *  Quarto: Retorna o objeto de resposta aceita, informando sucesso na requisição.
 * }
 * @async
 * @function execute
 * @param {Object} params - Os parâmentro de entrada do contato.
 * @param {string} params.name - O nome do usuário.
 * @param {string} params.email - O email do usuário.
 * @param {string} params.message - A mensagem do usuário.
 */
async function execute({ name, email, message }) {
    try {
        validateNameEmailMessage({ name, email, message });

        const reqContact = createContact(sanitizeEntries(name, email, message));

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
            msg: err.message || "Unknown error, try again later",
        };
    }
}

/**
 * Valida Nome, Email e Mensagem do usuário.
 * @function validateNameEmailMessage
 * @param {Object} params - Parâmetros para validar
 * @param {string} params.name - O nome do usuário.
 * @param {string} params.email - O email do usuário.
 * @param {string} params.message - A mensagem do usuário.
 * @throws {StatusErr} Envia um erro caso alguma validação falhe.
 */
function validateNameEmailMessage({ name, email, message }) {
    // Validação se campo existe
    if (!name || !email || !message) {
        throw new StatusErr("Todos os campos são obrigatórios", 400);
    }

    // Validação tipagem do campo
    if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof message !== "string"
    ) {
        throw new StatusErr("Todos os campos devem ser do tipo 'texto'", 400);
    }

    // Validação tamanho nome
    if (name.length < 3) {
        throw new StatusErr(
            "O campo 'nome' deve conter pelo menos 3 caracteres",
            400
        );
    }

    // Validação email
    if (!email.match(/^[^]+@[^]+\.[a-z]{2,3}$/)) {
        throw new StatusErr("O campo 'email' deve ser um email válido", 400);
    }

    // Validação tamanho mensagem
    if (message.length < 10) {
        throw new StatusErr(
            "O campo 'mensagem' deve conter pelo menos 10 caracteres",
            400
        );
    }
}

/**
 * Cria uma instância de modelo de Contato.
 * @function createContact
 * @param {Object} params - Parâmetros para validar
 * @param {string} params.name - O nome do usuário.
 * @param {string} params.email - O email do usuário.
 * @param {string} params.message - A mensagem do usuário.
 * @returns {Contact} Uma nova instância de contato.
 */
function createContact({ name, email, message }) {
    const contact = new Contact({
        name,
        email,
        message,
    });
    return contact;
}

/**
 * Sanitiza os campos.
 * @function sanitizeEntries
 * @param {string} name - O nome para sanitizar.
 * @param {string} email - O email para sanitizar.
 * @param {string} message - A mensagem para sanitizar.
 * @returns {Object} Objeto com os dados sanitizados.
 */
function sanitizeEntries(name, email, message) {
    const normalizeName = name.trim().toUpperCase();
    const normalizeEmail = email.trim().toLowerCase();
    const normalizeMessage = message.trim();

    return {
        name: normalizeName,
        email: normalizeEmail,
        message: normalizeMessage,
    };
}

module.exports = { execute };
