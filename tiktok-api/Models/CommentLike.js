const Database = require("../System/Database");

class CommentLike extends Database {
    likeComment(userId, commentId) {
        return this.query(
            `INSERT INTO comment_likes 
                (user_id, comment_id, created_at)
            VALUES (?, ?, NOW())`,
            [userId, commentId]);
    }

    unlikeComment(userId, commentId) {
        return this.query(
            `DELETE FROM comment_likes WHERE user_id = ? AND comment_id = ?`, [userId, commentId]);
    }
}

module.exports = CommentLike;