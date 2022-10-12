const Express = require("express");
const multer = require("multer");
const Router = Express.Router();
const UserController = require("../Controllers/Users");

const { uuid } = require("uuidv4");
const path = require('path');

//move this to another class?
const imageStorage = multer.diskStorage({
    destination: "./uploads/pictures",
    filename: (req, file, callBack) => {
        const newFileName = uuid() + path.extname(file.originalname);
        callBack(null, newFileName);
    }
})
const imageUpload = multer({
    storage: imageStorage
}).single("image");

Router.get("/users", function (req, res) {
    new UserController().get(req, res);
});

Router.post("/users", function (req, res) {
    new UserController().create(req, res);
});

Router.put("/users", imageUpload, function(req, res) {
    new UserController().update(req, res);
});

Router.get("/users/suggestions", function (req, res) {
    new UserController().getUserSuggestions(req, res);
});

Router.get("/users/:username", function (req, res) {
    new UserController().getUserByUsername(req, res);
});

Router.post("/users/login", function (req, res) {
    new UserController().login(req, res);
});

Router.post("/users/logout", function (req, res) {
    new UserController().logout(req, res);
});



module.exports = Router;