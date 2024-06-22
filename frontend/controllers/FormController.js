const path = require("path");

module.exports = class FormController {
    static index(req, res) {
        const filePath = path.join(__dirname, "../public/html/index.html");
        res.sendFile(filePath);
    }
};
