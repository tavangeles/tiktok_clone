const Database = require("../System/Database");

class VideoComment extends Database {
    getVideoComments(videoId, userId = 0) {
        return this.query(
            `SELECT  vc.id as commentId, vc.user_id as userId, name, username, image_url as imageUrl, comment, vc.created_at as createdAt, count(cl.id) AS commentLikes, IF(comment_likes.id IS NULL, false, true) AS isLiked
            FROM video_comments vc
            INNER JOIN users u 
                ON vc.user_id = u.id
            LEFT JOIN comment_likes cl
                ON vc.id = cl.comment_id
            LEFT JOIN comment_likes 
                ON vc.id = comment_likes.comment_id
                AND comment_likes.user_id = ?
            WHERE vc.video_id = ?
            GROUP BY commentId, userId, name, username, imageUrl, comment, createdAt
            ORDER BY vc.created_at desc`, [userId, videoId]);
    }

    create(userId, videoId, comment) {
        return this.query(
            `INSERT INTO video_comments 
                (user_id, video_id, comment, created_at)
            VALUES
                (?, ?, ?, NOW())`,
            [userId, videoId, comment]);
    }
}

module.exports = VideoComment;