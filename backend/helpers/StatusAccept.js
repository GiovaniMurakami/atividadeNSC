function StatusAccept({ data = null, status = 200, msg = "ok" }) {
    return { data, status, msg };
}

module.exports = {
    StatusAccept,
};
