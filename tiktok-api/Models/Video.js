const Database = require("../System/Database");

class Video extends Database {
    getVideo(userId, videoId) {
        return this.get(`SELECT * FROM videos WHERE id = ? AND owner_id = ?`, [userId, videoId]);
    }

    createVideo(userId, videoDetails) {
        const { filename, caption, privacy } = videoDetails;
        return this.query(
            `INSERT INTO videos 
                (owner_id, video_url, caption, privacy_id, status_id, created_at)
            VALUES
                (?, ?, ?, ?, 0, NOW())`, [userId, filename, caption, privacy]);
    }
            
    updateVideo(videoId, videoDetails) {
        const { caption, privacy } = videoDetails;
        return this.query(`UPDATE videos SET caption = ?, privacy_id = ?, status_id = 1, updated_at = NOW() WHERE id = ?`, [caption, privacy, videoId]);
    }

    searchVideo(search, userId=0) {
        return this.query(
            `SELECT DISTINCT u.id as userId, u.username, u.name, u.image_url AS imageUrl, IF(uf.id IS NULL, false, true) AS isFollowing,
                v.id AS videoId, v.video_url AS videoUrl, v.caption, IF(vl.id IS NULL, false, true) AS isLiked, v.created_at AS createdAt,
                (SELECT COUNT(id) FROM video_likes WHERE video_id = v.id) AS likesCount, 
                (SELECT COUNT(id) FROM video_comments WHERE video_id = v.id) AS commentsCount
            FROM videos v
            INNER JOIN users u
                ON v.owner_id = u.id
            LEFT JOIN user_followings uf
                ON v.owner_id = uf.following_id
                AND uf.user_id = ?
            LEFT JOIN video_likes vl
                ON v.id = vl.video_id
                AND vl.user_id = ?
            WHERE status_id = 1
                AND privacy_id = 1
                AND (v.caption LIKE ?
                    OR u.name LIKE ?
                    OR u.username LIKE ?)
            ORDER BY likesCount DESC, createdAt DESC
            LIMIT 20`, [userId, userId, `%${search}%`, `%${search}%`, `%${search}%`]);
    }

    getAllVideos(userId, loggedInId=0) {
        return this.getAll(
            `SELECT DISTINCT u.id as userId, u.username, u.name, u.image_url AS imageUrl, IF(uf.id IS NULL, false, true) AS isFollowing,
                v.id AS videoId, v.video_url AS videoUrl, v.caption, IF(vl.id IS NULL, false, true) AS isLiked, v.created_at AS createdAt,
                (SELECT COUNT(id) FROM video_likes WHERE video_id = v.id) AS likesCount, 
                (SELECT COUNT(id) FROM video_comments WHERE video_id = v.id) AS commentsCount
            FROM videos v
            INNER JOIN users u
                ON v.owner_id = u.id
            LEFT JOIN user_followings uf
                ON v.owner_id = uf.following_id
                AND uf.user_id = ?
            LEFT JOIN video_likes vl
                ON v.id = vl.video_id
                AND vl.user_id = ?
            WHERE status_id = 1
                AND u.id = ?
            ORDER BY v.created_at DESC`, [loggedInId, loggedInId, userId]);
    }

    getPublicVideos(userId, loggedInId=0) {
        return this.getAll(
            `SELECT DISTINCT u.id as userId, u.username, u.name, u.image_url AS imageUrl, IF(uf.id IS NULL, false, true) AS isFollowing,
                v.id AS videoId, v.video_url AS videoUrl, v.caption, IF(vl.id IS NULL, false, true) AS isLiked, v.created_at AS createdAt,
                (SELECT COUNT(id) FROM video_likes WHERE video_id = v.id) AS likesCount, 
                (SELECT COUNT(id) FROM video_comments WHERE video_id = v.id) AS commentsCount
            FROM videos v
            INNER JOIN users u
                ON v.owner_id = u.id
            LEFT JOIN user_followings uf
                ON v.owner_id = uf.following_id
                AND uf.user_id = ?
            LEFT JOIN video_likes vl
                ON v.id = vl.video_id
                AND vl.user_id = ?
            WHERE privacy_id = 1
                AND status_id = 1
                AND u.id = ?
            ORDER BY v.created_at DESC`, [loggedInId, loggedInId, userId]);
    }

    getVideosForYou(userId = 0, pageNumber=1) {
        return this.getAll(
            `SELECT DISTINCT u.id as userId, u.username, u.name, u.image_url AS imageUrl, IF(uf.id IS NULL, false, true) AS isFollowing,
                v.id AS videoId, v.video_url AS videoUrl, v.caption, IF(vl.id IS NULL, false, true) AS isLiked, v.created_at AS createdAt,
                (SELECT COUNT(id) FROM video_likes WHERE video_id = v.id) AS likesCount, 
                (SELECT COUNT(id) FROM video_comments WHERE video_id = v.id) AS commentsCount
            FROM videos v
            INNER JOIN users u
                ON v.owner_id = u.id
            LEFT JOIN user_followings uf
                ON v.owner_id = uf.following_id
                AND uf.user_id = ?
            LEFT JOIN video_likes vl
                ON v.id = vl.video_id
                AND vl.user_id = ?
            WHERE privacy_id = 1
                AND status_id = 1
            ORDER BY v.created_at DESC
            LIMIT ?`,
            [userId, userId, pageNumber*10]);
    }

    getVideosFollowing(userId = 0, pageNumber) {
        return this.getAll(
            `SELECT DISTINCT u.id as userId, u.username, u.name, u.image_url AS imageUrl, IF(uf.id IS NULL, false, true) AS isFollowing,
                v.id AS videoId, v.video_url AS videoUrl, v.caption, IF(vl.id IS NULL, false, true) AS isLiked, v.created_at AS createdAt,
                (SELECT COUNT(id) FROM video_likes WHERE video_id = v.id) AS likesCount, 
                (SELECT COUNT(id) FROM video_comments WHERE video_id = v.id) AS commentsCount
            FROM videos v
            INNER JOIN users u
                ON v.owner_id = u.id
            INNER JOIN user_followings uf
                ON v.owner_id = uf.following_id
                AND uf.user_id = ?
            LEFT JOIN video_likes vl
                ON v.id = vl.video_id
                AND vl.user_id = ?
            WHERE privacy_id = 1
                AND status_id = 1
            ORDER BY v.created_at DESC
            LIMIT ?`,
            [userId, userId, pageNumber*10]);
    }
}

module.exports = Video;