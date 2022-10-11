const Express = require("express");
const Router = Express.Router();
const ImageController = require("../Controllers/Images");


Router.get("/images/profile_pictures/:imageUrl", function (req, res) {
    new ImageController().get(req, res);
});

// Router.get("/logout", function(req, res) {
//     new StudentController().logout(req, res);
// });

// Router.post("/login", function(req, res) {
//     new StudentController().login(req, res);
// });

// Router.post("/register", function(req, res) {
//     new StudentController().register(req, res);
// });


module.exports = Router;
