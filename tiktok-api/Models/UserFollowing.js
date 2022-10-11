const Database = require("../System/Database");

class UserFollowing extends Database {
    followUser(userId, followingId) {
        return this.query(
            `INSERT INTO user_followings 
                (user_id, following_id, created_at)
            VALUE (?, ?, NOW())`,
            [userId, followingId]);
    }

    unfollowUser(userId, followingId) {
        return this.query(
            `DELETE FROM user_followings WHERE user_id = ? AND following_id = ?`, [userId, followingId]);
    }
}

module.exports = UserFollowing;