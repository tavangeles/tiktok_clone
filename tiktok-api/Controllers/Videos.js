const fs = require("fs");
const VideoModel = require("../Models/Video");

class Videos {
    constructor() {
        this.video = new VideoModel();
    }

    get(req, res) {
        const { videoId } = req.params;
        const range = req.headers.range;
        if (!range) {
            res.status(400).send("Requires Range header");
        }
        const videoPath = `./uploads/videos/${videoId}`;
        const videoSize = fs.statSync(videoPath).size;

        const CHUNK_SIZE = 10 ** 6; // 1MB
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };

        res.writeHead(206, headers);

        const videoStream = fs.createReadStream(videoPath, { start, end });
        videoStream.pipe(res);
    }

    
    async create(req, res) {
        const userId = req.session.userDetails?.userId;
        console.log(userId);
        if (!userId || !req.file) {
            res.json({
                success: false,
                errorMessage: ["Not authorized."],
            });
            return;
        }

        const { filename } = req.file;
        const { caption, privacy } = req.body;
        const result = await this.video.createVideo(userId, { filename, caption, privacy });
        console.log(result.insertId, filename)
        res.json({
            success: true,
            errorMessage: [],
            data: {
                videoId: result.insertId,
                filename,
            },
        })
    }

    async update(req, res) {
        const userId = req.session.userDetails?.userId;
        const { videoId } = req.params;
        const { video, caption, privacy } = req.body;
        let validationErrors = [];
        //move this validation to another function inside model
        if (!caption) {
            validationErrors.push("Caption is required.");
        }
        if (!privacy) {
            validationErrors.push("Privacy is required.");
        }
        if (!video) {
            validationErrors.push("Video is required.");
        }
        if (validationErrors.length > 0) {
            res.json({
                success: false,
                errorMessage: validationErrors
            });
            return;
        }

        const videoDetails = await this.video.getVideo(userId, videoId);
        if (!video) {
            res.json({
                success: false,
                errorMessage: ["Video not found."]
            });
            return;
        }

        const result = await this.video.updateVideo(videoId, { caption, privacy, videoId });
        res.json({
            success: true,
            errorMessage: [],
        })
    }

    async getVideosForYou(req, res) {
        const userId = req.session.userDetails?.userId;
        const videos = await this.video.getVideosForYou(userId);
        res.json({
            success: true,
            errorMessage: [],
            videos
        });
    }

    async getVideosFollowing(req, res) {
        const userId = req.session.userDetails?.userId;
        const videos = await this.video.getVideosFollowing(userId);
        res.json({
            success: true,
            errorMessage: [],
            videos
        });
    }
}

module.exports = Videos;
