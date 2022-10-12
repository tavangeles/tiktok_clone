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
            `SELECT id AS videoId, video_url as videoUrl , caption, privacy_id AS privacyId, created_at AS createdAt
            FROM videos
            WHERE owner_id = ?
                AND status_id = 1`, [userId]);
    }

    getPublicVideos(userId) {
        return this.getAll(
            `SELECT id AS videoId, video_url as videoUrl , caption, privacy_id AS privacyId, created_at AS createdAt 
            FROM videos
            WHERE owner_id = ?
                AND status_id = 1
                AND privacy_id = 1`, [userId]);
    }

    getVideosForYou(userId = 0) {
        return this.getAll(
            `SELECT u.id as userId, u.username, u.name, u.image_url AS imageUrl, IF(uf.id IS NULL, false, true) AS isFollowing,
                v.id AS videoId, v.video_url AS videoUrl, v.caption, IF(vl.id IS NULL, false, true) AS isLiked, COUNT(likes_count.id) as likesCount, v.created_at 
            FROM videos v
            INNER JOIN users u
                ON v.owner_id = u.id
            LEFT JOIN user_followings uf
                ON v.owner_id = uf.following_id
                AND uf.user_id = ?
            LEFT JOIN video_likes vl
                ON v.id = vl.video_id
                AND vl.user_id = ?
            LEFT JOIN video_likes likes_count
                ON v.id = likes_count.video_id
            WHERE privacy_id = 1
                AND status_id = 1
            GROUP BY userId, u.username, u.name, imageUrl, isFollowing, videoId, videoUrl, isLiked, v.created_at`,
            [userId, userId]);
    }

    getVideosFollowing(userId = 0) {
        return this.getAll(
            `SELECT DISTINCT u.id as userId, u.username, u.name, u.image_url AS imageUrl, true as isFollowing, v.id AS videoId, v.video_url AS videoUrl, v.caption, v.created_at 
            FROM videos v
            INNER JOIN users u
                ON v.owner_id = u.id
            INNER JOIN user_followings uf
                ON v.owner_id = uf.following_id
                AND uf.user_id = ?
            WHERE privacy_id = 1
                AND status_id = 1`, [userId]);
    }
}

module.exports = Video;