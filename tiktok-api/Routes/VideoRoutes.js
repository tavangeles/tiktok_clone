const Express = require("express");
const multer = require("multer");
const Router = Express.Router();
const VideoController = require("../Controllers/Videos");
const { uuid } = require("uuidv4");
const path = require('path');

//move this to another class?
const videoStorage = multer.diskStorage({
    destination: "./uploads/videos",
    filename: (req, file, callBack) => {
        const newFileName = uuid() + path.extname(file.originalname);
        callBack(null, newFileName);
    }
})

const videoUpload = multer({
    storage: videoStorage
}).single("video");

Router.get("/videos/foryou", function (req, res) {
    new VideoController().getVideosForYou(req, res);
});

Router.get("/videos/:videoId", function (req, res) {
    new VideoController().get(req, res);
});

Router.post("/videos", videoUpload, function (req, res) {
    new VideoController().create(req, res);
});

Router.put("/videos/:videoId", function (req, res) {
    new VideoController().update(req, res);
});


module.exports = Router;