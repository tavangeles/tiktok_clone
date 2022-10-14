const Express = require("express");
const Router = Express.Router();
const CommentController = require("../Controllers/Comments");



Router.get("/comments/video/:videoId", function (req, res) {
    new CommentController().getVideoComments(req, res);
});
Router.post("/comments/video", function (req, res) {
    new CommentController().createVideoComment(req, res);
});

module.exports = Router;