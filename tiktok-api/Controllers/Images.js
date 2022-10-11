// const ImageModel = require("../Models/Image");
const path = require("path");

class Images {
    constructor() {
        // this.image = new ImageModel();
    }

    get(req, res) {
        const { imageUrl } = req.params;
        res.sendFile(path.join(__dirname, `../uploads/pictures/${imageUrl}`));
    }
}

module.exports = Images;