const path = require("path");

class Images {
    get(req, res) {
        const { imageUrl } = req.params;
        res.sendFile(path.join(__dirname, `../uploads/pictures/${imageUrl}`));
    }
}

module.exports = Images;