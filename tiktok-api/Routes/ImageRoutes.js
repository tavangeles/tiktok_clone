const Express = require("express");
const Router = Express.Router();
const ImageController = require("../Controllers/Images");


Router.get("/images/profile_pictures/:imageUrl", function (req, res) {
    new ImageController().get(req, res);
});

module.exports = Router;