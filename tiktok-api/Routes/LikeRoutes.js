const Express = require("express");
const Router = Express.Router();
const LikeController = require("../Controllers/Likes");


Router.post("/likes/video", function (req, res) {
    new LikeController().likeVideo(req, res);
});

Router.delete("/likes/video", function (req, res) {
    new LikeController().unlikeVideo(req, res);
});

Router.post("/likes/comment", function (req, res) {
    new LikeController().likeComment(req, res);
});

Router.delete("/likes/comment", function (req, res) {
    new LikeController().unlikeComment(req, res);
});


module.exports = Router;