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
        return this.query(`UPDATE videos SET caption = ?, privacy_id = ?, status_id = 1, updated_at = NOW() WHERE id = ?`, [caption, privacy, videoId])
    }

    getAllVideos(userId) {
        return this.getAll(
            `SELECT v.id AS videoId, video_url as videoUrl , caption, privacy_id AS privacyId, v.created_at AS createdAt, u.id AS userId, u.name, u.username, u.image_url as imageUrl
            FROM videos v
            INNER JOIN users u
                ON v.owner_id = u.id
            WHERE owner_id = ?
                AND status_id = 1
            ORDER by v.created_at DESC`, [userId]);
    }

    getPublicVideos(userId) {
        return this.getAll(
            `SELECT v.id AS videoId, video_url as videoUrl , caption, privacy_id AS privacyId, v.created_at AS createdAt, u.id AS userId, u.name, u.username, u.image_url as imageUrl
            FROM videos v
            INNER JOIN users u
                ON v.owner_id = u.id
            WHERE owner_id = ?
                AND status_id = 1
                AND privacy_id = 1
            ORDER by v.created_at DESC`, [userId]);
    }

    getVideosForYou(userId = 0) {
        return this.getAll(
            `SELECT u.id as userId, u.username, u.name, u.image_url AS imageUrl, IF(uf.id IS NULL, false, true) AS isFollowing,
                v.id AS videoId, v.video_url AS videoUrl, v.caption, IF(vl.id IS NULL, false, true) AS isLiked, v.created_at,
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
            ORDER BY v.created_at desc`,
            [userId, userId]);
    }

    getVideosFollowing(userId = 0) {
        return this.getAll(
            `SELECT u.id as userId, u.username, u.name, u.image_url AS imageUrl, IF(uf.id IS NULL, false, true) AS isFollowing,
                v.id AS videoId, v.video_url AS videoUrl, v.caption, IF(vl.id IS NULL, false, true) AS isLiked, v.created_at,
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
            ORDER BY v.created_at desc`,
            [userId, userId]);
    }
}

module.exports = Video;