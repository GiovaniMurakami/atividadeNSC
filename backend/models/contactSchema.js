const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * Esquema Mongoose para criar um modelo de Contato
 * @typedef {Object} Contact
 * @property {string} name - Nome do usuário.
 * @property {string} email - Email do usuário.
 * @property {string} message - Mensagem do usuário.
 * @property {Date} createdAt - Data de quando o formulário foi enviado(criado automaticamente).
 * @property {Date} updatedAt - Data da última atualização do contato(criado e atualizado automaticamente).
 */
const ContactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Nome é obrigatório"],
            minlength: [3, "Nome deve conter pelo menos 3 caracteres"],
        },
        email: {
            type: String,
            required: [true, "Email é obrigatório"],
        },
        message: {
            type: String,
            required: [true, "Mensagem é obrigatória"],
            minlength: [10, "Mensagem deve conter pelo menos 10 caracteres"],
        },
    },
    { timestamps: true }
);

/**
 * Modelo Mongoose para o esquema de contatos.
 * @type {Model<Contact>}
 */
const Contact = mongoose.model("Contact", ContactSchema, "contacts");

module.exports = Contact;
