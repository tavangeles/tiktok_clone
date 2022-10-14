const VideoCommentModel = require("../Models/VideoComment");

class Comments {
    constructor() {
        this.videoComment = new VideoCommentModel();
    }

    async getVideoComments(req, res) {
        const userId = req.session.userDetails?.userId;
        const { videoId } = req.params;
        const result = await this.videoComment.getVideoComments(videoId, userId);
        
        res.json({
            success: true,
            errorMessage: [],
            comments: result
        });
    }

    async createVideoComment(req, res) {
        const userId = req.session.userDetails?.userId;
        const { videoId, comment } = req.body;

        if (!userId) {
            res.json({
                success: false,
                errorMessage: "Not authorized"
            });
            return;
        }

        const result = await this.videoComment.create(userId, videoId, comment);

        res.json({
            success: true,
            errorMessage: [],
            commentId: result.insertId,
        });
    }
}

module.exports = Comments;