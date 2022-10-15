import { useEffect, useState } from "react";
import { useUserContext } from "../../hooks/userContext";
import { useNavigate } from "react-router-dom";
import { usePageContext } from "../../hooks/pageContext";
import { createVideoComment, getVideoComments } from "../../services/comments";
import { likeComment, unlikeComment } from "../../services/likes";
import { formatTimeDiff } from "../../helpers/date";
import ProfilePicture from "../profile-picture/profile-picture";
import Comment from "../comment/comment";
import Reactions from "../reactions/reactions";
import Modal from "../modal/modal";
import closeIcon from "../../assets/svgs/close-white.svg";
import settingsIcon from "../../assets/svgs/dots.svg";
import "./video-full-screen.styles.scss";

const VideoFullScreen = ({ video, onCloseHandler, onFollowHandler, onLikeHandler }) => {
    const user = useUserContext();
    const page = usePageContext();
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    console.log(video);
    const { userId, username, name, imageUrl, isFollowing, videoId, videoUrl, caption, isLiked, likesCount, commentsCount = 0, createdAt } = video;
    useEffect(() => {
        getVideoComments(videoId).then(res => {
            setComments(res.comments);
        })
    }, [])

    const handleNavigate = () => {
        navigate(`/account/${username}`)
    }

    const handleCommentLike = (commentId, isCommentLiked) => {
        setComments(prevComments => {
            return prevComments.map(comment => {
                return comment.commentId === commentId ?
                    {
                        ...comment,
                        isLiked: !comment.isLiked,
                        commentLikes: comment.isLiked ? comment.commentLikes - 1 : comment.commentLikes + 1
                    }
                    : comment;
            })
        })

        if (!isCommentLiked) {
            likeComment(commentId);
        }
        else {
            unlikeComment(commentId);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!comment) {
            return;
        }

        createVideoComment(videoId, comment).then((res) => {
            setComments(prevComments => {
                return [
                {
                    commentId: res.commentId,
                    name: user.name,
                    imageUrl: user.imageUrl,
                    comment,
                    createdAt: new Date(),
                    commentLikes: 0,
                    isLiked: false
                },
                ...prevComments]
            })
            setComment("");
        });
    } 
    
    const handleSettingsClick = () => {
        setIsSettingsOpen(prevState => !prevState)
    }

    return (
        <div className="video-full-screen">
            <button onClick={onCloseHandler} className="close-btn"><img src={closeIcon} alt="close" /></button>
            <video loop autoPlay controls controlslist="nofullscreen">
                <source src={`${process.env.REACT_APP_API_URL}videos/${videoUrl}`} type="video/mp4" />
            </video>
            <div className="video-details-container">
                <div className="details-container">
                    <div className="profile-details">
                        <ProfilePicture imageUrl={imageUrl} diameter="56px" onClick={handleNavigate}/>
                        <div>
                            <p className="username" onClick={handleNavigate}>{username}</p>
                            <p className="name" onClick={handleNavigate}>{name}<span className="post-date">{formatTimeDiff(createdAt)}</span></p>
                        </div>
                        {
                            user?.userId !== video.userId &&
                            <button className={isFollowing ? "button-active" : ""} onClick={onFollowHandler}>{isFollowing ? "Following" : "Follow"}</button>}
                        {
                            user?.userId === video.userId && 
                            <>
                                <div class="dropdown">
                                    <button className="settings-btn" onClick={handleSettingsClick}><img src={settingsIcon} alt="settings" /></button>
                                    <div class="dropdown-content">
                                        <p onClick={handleSettingsClick}>Privacy Settings</p>
                                        <p>Delete</p>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                    <pre className="caption">{caption}</pre>
                    <Reactions isLiked={isLiked} likesCount={likesCount} commentsCount={commentsCount} onLikeHandler={onLikeHandler} />
                </div>
                <div className="comments-container">
                    {comments.map(comment => {
                        return <Comment key={comment.commentId} commentDetails={comment} onLike={handleCommentLike} />
                    })}
                </div>
                <form className="comment-box" onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        placeholder="Add comment..."
                        onChange={(event) => setComment(event.target.value)}
                        value={comment}
                    />
                    <button>Post</button>
                </form>
            </div>
            {isSettingsOpen &&
                <Modal>
                    <h1>hi</h1>
                </Modal>
            } 
        </div >
    )
};

export default VideoFullScreen;

