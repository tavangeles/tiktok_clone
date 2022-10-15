import { useEffect, useState } from "react";
import { usePageUpdateContext } from "../../hooks/pageContext";
import { likeVideo, unlikeVideo } from "../../services/likes";
import { getVidoesFollowing } from "../../services/videos";
import { followUser, unfollowUser } from "../../services/userFollowing";
import Post from "../../components/post/post";
import "./following.styles.scss";

const Following = () => {
    const [videos, setVideos] = useState([]);
    const setPage = usePageUpdateContext();

    useEffect(() => {
        setPage("Following");
        getVidoesFollowing().then((res) => {
            setVideos(res.videos);
        });
    }, [])
    
    
    const handleFollowUser = (userId, isFollowing) => {
        isFollowing ? unfollowUser(userId) : followUser(userId);

        setVideos(prevVideos => prevVideos.map(video => {
                return video.userId === userId ? { ...video, isFollowing: !video.isFollowing } : video;
            })
        )
    }
    
    const handleLikeVideo = (videoId, isLiked) => {
        isLiked ? unlikeVideo(videoId) : likeVideo(videoId);
        
        setVideos(prevVideos => prevVideos.map(video => {
            return video.videoId === videoId ?
                {
                    ...video,
                    isLiked: !video.isLiked,
                    likesCount: (video.isLiked ? video.likesCount - 1 : video.likesCount + 1)
                }
                : video;
            })
        )
    }

    return (
        <div className="following-container">
            {videos.map(video => {
                return <Post
                    key={video.videoId}
                    video={video}
                    onFollowHandler={handleFollowUser}
                    onLikeHandler={handleLikeVideo}
                />
            })}
        </div>
    );
};


export default Following;
