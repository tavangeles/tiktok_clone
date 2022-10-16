import { useCallback, useEffect, useRef, useState } from "react";
import { usePageUpdateContext } from "../../hooks/pageContext";
import { likeVideo, unlikeVideo } from "../../services/likes";
import { getVidoesFollowing } from "../../services/videos";
import { followUser, unfollowUser } from "../../services/userFollowing";
import Post from "../../components/post/post";
import "./following.styles.scss";
import TopButton from "../../components/top-button/top-button";

const Following = () => {
    const setPage = usePageUpdateContext();
    const observer = useRef();
    const [videos, setVideos] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setPage("Following");
        getVidoesFollowing(pageNumber).then((res) => {
            setVideos(res.videos);
            setIsLoading(false);
        });
    }, [])
    
    const lastVideoElementRef = useCallback(node => {
        if (isLoading) {
            return;
        }
        if (observer.current) {
            observer.current.disconnect();
        }
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPageNumber(prevPageNumber => prevPageNumber + 1);
                setIsLoading(true);
                getVidoesFollowing(pageNumber + 1).then((res) => {
                    setVideos(prevVideos => {
                        return res.videos.filter((videoResponse) => {
                            return videos.some(video => video.videoId !== videoResponse.videoId)
                        })
                    })
                    setVideos(res.videos);
                    setIsLoading(false);
                });
            }
        })
        if (node) {
            observer.current.observe(node);
        }
    }, [isLoading, pageNumber]);

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
            {videos.map((video, index) => {
                if (videos.length === index + 1) {
                    return <Post
                        key={video.videoId}
                        video={video}
                        onFollowHandler={handleFollowUser}
                        onLikeHandler={handleLikeVideo}
                        reference={lastVideoElementRef}
                    />
                }
                else {
                    return <Post
                        key={video.videoId}
                        video={video}
                        onFollowHandler={handleFollowUser}
                        onLikeHandler={handleLikeVideo}
                    />
                }
            })}
             <TopButton />
        </div>
    );
};


export default Following;
