const bcrypt = require("bcryptjs");
const Database = require("../System/Database");

class User extends Database {

    getUserByUserId(userId) {
        return this.get("SELECT id, name, username, image_url, bio, password FROM users WHERE id = ?", [userId]);
    }

    getUserByEmail(email) {
        return this.get("SELECT id, name, username, image_url, bio, password FROM users WHERE email = ?", [email]);
    }

    getUserByUsername(username) {
        return this.get("SELECT id, name, username, image_url, bio, password FROM users WHERE username = ?", [username]);
    }

    getSuggestedAccounts(userId = 0) {
        return this.getAll(
            `SELECT distinct u.id, u.username, u.name, u.image_url as imageUrl FROM users u
            LEFT JOIN user_followings uf
                ON u.id = uf.following_id
                AND uf.user_id = ?
            WHERE uf.id IS NULL
            AND u.id != ?`, [userId, userId]);
    }
    
    getFollowingAccounts(userId) {
         return this.getAll(
            `SELECT u.id, u.username, u.name, u.image_url as imageUrl FROM users u
            INNER JOIN user_followings uf
                ON u.id = uf.following_id
            WHERE uf.user_id = ?`, [userId]);
    }

    createUser(userDetails) {
        const { userId, name, username, emailAddress, password, imageUrl, bio} = userDetails;

        return this.query(
            `INSERT INTO users 
                (id, name, username, email, password, image_url, bio, created_at)
            VALUES
                (?, ?, ?, ?, ?, ?, "", NOW())`, [userId, name, username, emailAddress, password, imageUrl, bio]);
    }

    updateUser(userId, userDetails) {
        const { name, bio, imageUrl } = userDetails;
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