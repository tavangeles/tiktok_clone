import { useEffect, useState } from "react";
import { useUserContext } from "../../hooks/userContext";
import { createVideoComment, getVideoComments } from "../../services/comments";
import { likeComment, unlikeComment } from "../../services/likes";
import Comment from "../comment/comment";
import PostDetails from "../post-details/post-details";
import close from "../../assets/svgs/close-white.svg";
import "./video-full-screen.styles.scss";

const VideoFullScreen = ({ video, onCloseHandler, onFollowHandler }) => {
    const user = useUserContext();
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const { username, name, imageUrl, isFollowing, videoId, videoUrl, caption, isLiked, likesCount, commentsCount = 0 } = video;
    
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

    return (
        <div className="video-full-screen">
            <button onClick={onCloseHandler} className="close-btn"><img src={close} alt="close" /></button>
            <video loop autoPlay controls controlslist="nofullscreen">
                <source src={`${process.env.REACT_APP_API_URL}videos/${videoUrl}`} type="video/mp4" />
            </video>
            <div className="details-container">
                <PostDetails 
                    imageUrl={imageUrl}
                    username={username}
                    name={name}
                    caption={caption}
                    isFollowing={isFollowing}
                    onFollowHandler={onFollowHandler}
                />
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
        </div >
    )
};

export default VideoFullScreen;

