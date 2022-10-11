const Express = require("express");
const Router = Express.Router();
const UserFollowingController = require("../Controllers/UserFollowings");

Router.post("/user_following", function (req, res) {
    new UserFollowingController().followUser(req, res);
});

Router.delete("/user_following", function (req, res) {
    new UserFollowingController().unFollowUser(req, res);
});

module.exports = Router;