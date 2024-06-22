/**
 * Representa um erro com um código de status associado.
 * @extends Error
 */
class StatusErr extends Error {
    /**
     * Cria uma nova instância de StatusErr.
     * @param {string} message - Mensagem de erro.
     * @param {number} [status=500] - Código de status relacionado ao erro.
     */
    constructor(message, status = 500) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
    }
}

module.exports = StatusErr;
