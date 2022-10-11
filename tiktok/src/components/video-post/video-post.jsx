import { useRef, useState, useMemo, useEffect } from "react";
import ProfilePicture from "../profile-picture/profile-picture";
import heart from "../../assets/svgs/heart.svg";
import comment from "../../assets/svgs/comment.svg";
import "./video-post.styles.scss";

const VideoPost = ({video}) => {
    const targetRef = useRef(null);
    const [isVisible, setIsVisible] = useState("");
    const { username, name, imageUrl, videoUrl, caption } = video;

    const callBackFunction = entries => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
    }

    const options = useMemo(() => {
        return {
            root: null,
            rootMargin: '-50% 0px',
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
        <div className="post-container">
            <ProfilePicture imageUrl={imageUrl} diameter="56px"/>
            <div className="main">
                <div className="name-container">
                    <p className="username">{username}</p>
                    <p className="name">{name}</p>
                </div>
                <p>{caption}</p>
                <div className="video-container">
                    <video id="videoPlayer"
                        controls
                        loop
                        ref={targetRef}
                    >
                        <source src={`${process.env.REACT_APP_API_URL}videos/${videoUrl}`} type="video/mp4" />
                    </video>
                    <div className="reactions-container">
                        <div>
                            <img src={heart} alt="heart" />
                            <p>1000</p>
                        </div>
                        <div>
                            <img src={comment} alt="comment" />
                            <p>1000</p>
                        </div>

                    </div>
                </div>
            </div>
            <div className="follow-container">
                <button>Follow</button>
            </div>
        </div>
    );
};

export default VideoPost;

