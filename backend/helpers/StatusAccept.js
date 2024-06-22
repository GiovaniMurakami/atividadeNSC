/**
 * Constrói um objeto de resposta aceita.
 * @param {Object} [params] - O objeto contendo os parâmentros da resposta.
 * @param {*} [params.data=null] - Conteúdo da resposta a ser enviado para o frontend(se existir).
 * @param {number} [params.status=200] - Código de status para a resposta.
 * @param {string} [params.msg="ok"] - Mensagem para a resposta
 * @returns {Object} O objeto de resposta a ser enviado.
 */
function StatusAccept({ data = null, status = 200, msg = "ok" } = {}) {
    return { data, status, msg };
}

module.exports = {
    StatusAccept,
};
