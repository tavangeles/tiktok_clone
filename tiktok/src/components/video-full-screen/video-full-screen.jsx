import { useEffect, useState } from "react";
import { useUserContext } from "../../hooks/userContext";
import { createVideoComment, getVideoComments } from "../../services/comments";
import { likeComment, unlikeComment } from "../../services/likes";
import { formatTimeDiff } from "../../helpers/date";
import Button from "../button/button";
import User from "../user/user";
import Comment from "../comment/comment";
import Reactions from "../reactions/reactions";
import Caption from "../caption/caption";
import Modal from "../modal/modal";
import closeIcon from "../../assets/svgs/close-white.svg";
import settingsIcon from "../../assets/svgs/dots.svg";
import "./video-full-screen.styles.scss";

const VideoFullScreen = ({ video, onCloseHandler, onFollowHandler, onLikeHandler }) => {
    const user = useUserContext();
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const { username, name, imageUrl, isFollowing, videoId, videoUrl, caption, isLiked, likesCount, commentsCount = 0, createdAt } = video;

    useEffect(() => {
        getVideoComments(videoId).then(res => {
            setComments(res.comments);
        })
    }, [])

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
        <>
            <div className="video-full-screen">
                <button onClick={onCloseHandler} className="close-btn"><img src={closeIcon} alt="close" /></button>
                <video loop autoPlay controls controlslist="nofullscreen">
                    <source src={`${process.env.REACT_APP_API_URL}videos/${videoUrl}`} type="video/mp4" />
                </video>
                <div className="video-details-container">
                    <div className="video-details">
                        <User user={{ imageUrl, username, name }} pictureDiameter="40px" details={formatTimeDiff(createdAt)} />
                        {
                            user?.userId !== video.userId ?
                                <Button buttonType={isFollowing ? "secondary" : "inverted"} onClick={onFollowHandler}>{isFollowing ? "Following" : "Follow"}</Button> :
                                <>
                                    <div className="dropdown">
                                        <button className="settings-btn" onClick={handleSettingsClick}><img src={settingsIcon} alt="settings" /></button>
                                        <div className="dropdown-content">
                                            <p onClick={handleSettingsClick}>Privacy Settings</p>
                                            <p>Delete</p>
                                        </div>
                                    </div>
                                </>
                        }
                    </div>
                    <Caption>{caption}</Caption>
                    <Reactions isLiked={isLiked} likesCount={likesCount} commentsCount={commentsCount} onLikeHandler={onLikeHandler} />
                    <div className="comments">
                        {comments.map(comment => {
                            return <Comment key={comment.commentId} commentDetails={comment} onLike={handleCommentLike} />
                        })}
                    </div>
                    <form className="comment-form" onSubmit={handleSubmit}>
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
        </>
    )
};

export default VideoFullScreen;