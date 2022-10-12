const Database = require("../System/Database");

class VideoLike extends Database {
    likeVideo(userId, videoId) {
        return this.query(
            `INSERT INTO video_likes 
                (user_id, video_id, created_at)
            VALUES (?, ?, NOW())`,
            [userId, videoId]);
    }

    unlikeVideo(userId, videoId) {
        console.log(userId, videoId);
        return this.query(
            `DELETE FROM video_likes WHERE user_id = ? AND video_id = ?`, [userId, videoId]);
    }
}

module.exports = VideoLike;