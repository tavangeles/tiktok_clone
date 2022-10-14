
import { useEffect, useState } from "react";
import { usePageUpdateContext } from "../../hooks/pageContext";
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
        <div className="following-container">
            {videos.map(video => {
                return <Post key={video.videoId} video={video} onFollowHandler={handleFollowUser} />
            })}
        </div>
    );
};

export default Following;
