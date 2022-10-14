const VideoLikeModel = require("../Models/VideoLike");
const CommentLikeModel = require("../Models/CommentLike");

class Images {
    constructor() {
        this.videoLike = new VideoLikeModel();
        this.commentLike = new CommentLikeModel();
    }

    async likeVideo(req, res) {
        const userId = req.session.userDetails?.userId;
        const { videoId } = req.body;

        if (!userId) {
            res.json({
                success: false,
                errorMessage: "Not authorized"
            });
            return;
        }


        const result = await this.videoLike.likeVideo(userId, videoId);
        
        res.json({
            success: true,
            errorMessage: []
        });
    }

    async unlikeVideo(req, res) {
        const userId = req.session.userDetails?.userId;
        const { videoId } = req.body;

        if (!userId) {
            res.json({
                success: false,
                errorMessage: "Not authorized"
            });
            return;
        }


        const result = await this.videoLike.unlikeVideo(userId, videoId);

        res.json({
            success: true,
            errorMessage: []
        });
    }

    async likeComment(req, res) {
        const userId = req.session.userDetails?.userId;
        const { commentId } = req.body;

        if (!userId) {
            res.json({
                success: false,
                errorMessage: "Not authorized"
            });
            return;
        }


        const result = await this.commentLike.likeComment(userId, commentId);

        res.json({
            success: true,
            errorMessage: []
        });
    }

    async unlikeComment(req, res) {
        const userId = req.session.userDetails?.userId;
        const { commentId } = req.body;

        if (!userId) {
            res.json({
                success: false,
                errorMessage: "Not authorized"
            });
            return;
        }


        const result = await this.commentLike.unlikeComment(userId, commentId);

        res.json({
            success: true,
            errorMessage: []
        });
    }
}

module.exports = Images;