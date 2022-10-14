import ProfilePicture from "../profile-picture/profile-picture";
import { formatTimeDiff } from "../../helpers/date";
import heartInactive from "../../assets/svgs/heart-inactive.svg";
import heartActive from "../../assets/svgs/heart-active.svg";
import "./comment.styles.scss";

const Comment = ({ commentDetails, onLike }) => {
    const { commentId, imageUrl, name, comment, createdAt, commentLikes, isLiked } = commentDetails;
    
    const onLikeHandler = () => {
        onLike(commentId, isLiked);
    }

    return (
        <div className="comment">
        <ProfilePicture imageUrl={imageUrl} diameter="48px" />
        <div className="comment-details-container">
            <p className="name">{name}</p>
            <p className="comment">{comment}</p>
            <span className="comment-date">{formatTimeDiff(createdAt)}</span>
        </div>
        <div className="like-btn" onClick={onLikeHandler}>
            <img src={isLiked ? heartActive : heartInactive } alt="like"/>
            <p>{commentLikes}</p>
        </div>
        </div>
    );
};

export default Comment;

