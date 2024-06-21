const mongoose = require("mongoose");
const { Schema } = mongoose;

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

const Contact = mongoose.model("Contact", ContactSchema, "contacts");

module.exports = Contact;
