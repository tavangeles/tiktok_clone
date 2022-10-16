const bcrypt = require("bcryptjs");
const Database = require("../System/Database");

class User extends Database {

    getUserByUserId(userId) {
        return this.get("SELECT id, name, username, image_url, bio, password FROM users WHERE id = ?", [userId]);
    }

    getUserByEmail(email) {
        return this.get("SELECT id, name, username, image_url, bio, password FROM users WHERE email = ?", [email]);
    }

    getUserByUsername(username, userId = 0) {
        return this.get(
            `SELECT u.id, u.name, u.username, u.image_url, u.bio, u.password, IF(uf.id IS NULL, false, true) AS isFollowing,
            (SELECT COUNT(*) FROM user_followings WHERE user_id = u.id) AS followingCount, 
            (SELECT COUNT(*) FROM user_followings WHERE following_id = u.id) AS followersCount, 
            (SELECT COUNT(*) FROM video_likes INNER JOIN videos ON video_id = videos.id WHERE owner_id = u.id) AS likesCount
            FROM users u
            LEFT JOIN user_followings uf
                ON u.id = uf.following_id
                AND uf.user_id = ?
            WHERE u.username = ?`, [userId, username]);
    }

    getSuggestedAccounts(userId = "") {
        return this.getAll(
            `SELECT u.id, 
                u.username, 
                u.name, 
                u.image_url as imageUrl, 
                (SELECT COUNT(id) FROM user_followings WHERE following_id = u.id) AS followingsCount
            FROM users u
            LEFT JOIN user_followings uf
                ON u.id = uf.following_id
                AND uf.user_id = ?
            WHERE uf.id IS NULL
            AND u.id != ?
            ORDER BY followingsCount DESC
            LIMIT 10`, [userId, userId]);
    }
    
    getFollowingAccounts(userId) {
         return this.getAll(
            `SELECT u.id, 
                u.username, 
                u.name, 
                u.image_url as imageUrl
            FROM users u
            INNER JOIN user_followings uf
                ON u.id = uf.following_id
            WHERE uf.user_id = ?
            ORDER BY uf.created_at DESC
            LIMIT 10`, [userId]);
    }

    searchUser(search) {
        return this.query(
            `SELECT u.id AS userId, u.name, u.username, u.bio, u.image_url AS imageUrl, COUNT(uf.id) AS followersCount
            FROM users u
            LEFT JOIN user_followings uf
                ON u.id = uf.following_id
            WHERE username LIKE ? OR name LIKE ?
            GROUP BY userId, u.name, u.username, u.bio, imageUrl
            ORDER by followersCount DESC
            LIMIT 5`, [`%${search}%`, `%${search}%`]);
    }

    createUser(userDetails) {
        const { userId, name, username, emailAddress, password, imageUrl, bio} = userDetails;
        const passwordHash = bcrypt.hashSync(password, 10);
        return this.query(
            `INSERT INTO users 
                (id, name, username, email, password, image_url, bio, created_at)
            VALUES
                (?, ?, ?, ?, ?, ?, "", NOW())`, [userId, name, username, emailAddress, passwordHash, imageUrl, bio]);
    }

    updateUser(userId, userDetails) {
        const { name, bio, imageUrl } = userDetails;
        return this.getAll(
            `UPDATE users 
            SET name = ?, bio = ?, image_url = ?, updated_at = NOW()
            WHERE id = ?`, [name, bio, imageUrl, userId]);
    }

    followUser(userId, followingId) {
        return this.getAll(
            `UPDATE users 
            SET name = ?, bio = ?, image_url = ?, updated_at = NOW()
            WHERE id = ?`, [name, bio, imageUrl, userId]);
    }

    verifyPassword(password, userPassword) {
        return bcrypt.compareSync(password, userPassword);
    }
}

module.exports = User;