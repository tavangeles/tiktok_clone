import { useCallback, useEffect, useRef, useState } from "react";
import { usePageUpdateContext } from "../../hooks/pageContext";
import { getVideosForYou } from "../../services/videos";
import { followUser, unfollowUser } from "../../services/userFollowing";
import { likeVideo, unlikeVideo } from "../../services/likes";
import Post from "../../components/post/post";
import "./for-you.styles.scss";

const ForYou = () => {
    const setPage = usePageUpdateContext();
    const observer = useRef();
    const [videos, setVideos] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setPage("For You");
        getVideosForYou(1).then((res) => {
            setVideos(res.videos);
            setIsLoading(false);
        });
    }, []);

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
                getVideosForYou(pageNumber + 1).then((res) => {
                    console.log(res);
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
    }, [isLoading, pageNumber])

    const handleGet = () => {
        setPageNumber(pageNumber + 1);
    }
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    
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
        <div className="for-you-container">
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
            {/* <button className="btn-scroll"onClick={scrollToTop}>to top</button> */}
        </div>
    );
};

export default ForYou;