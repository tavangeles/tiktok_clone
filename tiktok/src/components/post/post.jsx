import { useRef, useState, useMemo, useEffect } from "react";
import VideoFullScreen from "../video-full-screen/video-full-screen";
import PostDetails from "../post-details/post-details";
import Video from "../video/video";
import "./post.styles.scss";

const Post = ({video, onFollowHandler, onLikeHandler}) => {
    const targetRef = useRef(null);
    const [isVisible, setIsVisible] = useState("");
    const [isFullVideoOpen, setIsFullVideoOpen] = useState(false);
    const { userId, username, name, imageUrl, isFollowing, videoId, videoUrl, caption, isLiked, likesCount, commentsCount = 0 } = video;
    
    const callBackFunction = entries => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
    }

    const handleFollowClick = () => {
        onFollowHandler(userId, isFollowing);
    }

    const handleLikeClick = () => {
        onLikeHandler(videoId, isLiked);
    }

    const handleVideoClick = () => {
        // if (!isFullVideoOpen) {
        //     document.body.style.overflow = "hidden";
        // }
        // else {
        //     document.body.style.overflow = "unset";
        // }
        setIsFullVideoOpen(prev => !prev);
        targetRef.current.pause()
    }

    const options = useMemo(() => {
        return {
            root: null,
            rootMargin: "-50% 0px",
            treshhold: 0.5
        }
    });

    useEffect(() => {
        const observer = new IntersectionObserver(callBackFunction, options);
        const currentTarget = targetRef.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }
        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        }
    }, [targetRef, options])

    useEffect(() => {
        isVisible ? targetRef.current.play() : targetRef.current.pause();
    }, [isVisible])

    return (
        <>          
            <div className="post">
                <PostDetails
                    imageUrl={imageUrl}
                    username={username}
                    name={name}
                    caption={caption}
                    isFollowing={isFollowing}
                    onFollowHandler={handleFollowClick}
                />
                <Video
                    videoUrl={videoUrl}
                    targetRef={targetRef}
                    likesCount={likesCount}
                    isLiked={isLiked}
                    commentsCount={commentsCount}
                    onLikeHandler={handleLikeClick}
                    onFullScreen={handleVideoClick}
                />
            </div>
            {isFullVideoOpen && <VideoFullScreen video={video} onCloseHandler={handleVideoClick} onFollowHandler={handleFollowClick} onLikeHandler={handleLikeClick} />}
        </>
    );
};

export default Post;

