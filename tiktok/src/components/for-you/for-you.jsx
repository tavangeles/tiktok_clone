import { useEffect, useState } from "react";
import { getVideosForYou } from "../../services/videos";
import { followUser, unfollowUser } from "../../services/userFollowing";
import VideoPost from "../video-post/video-post";
import "./for-you.styles.scss";

const ForYou = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        getVideosForYou().then((res) => {
            setVideos(res.videos);
        });
    }, [])
    
    const handleFollowUser = (userId, isFollowing) => {
        if (!isFollowing) {
            followUser(userId);
        }
        else {
            unfollowUser(userId);
        }

        setVideos(prevVideos => prevVideos.map(video => {
                return video.userId === userId ? { ...video, isFollowing: !video.isFollowing } : video;
            })
        )
    }

    return (
        <div className="for-you-container">
            {videos.map(video => {
                return <VideoPost key={video.videoId} video={video} onFollowHandler={handleFollowUser} />
            })}
        </div>
    );
};

export default ForYou;
