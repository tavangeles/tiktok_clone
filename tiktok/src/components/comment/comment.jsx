import { useNavigate } from "react-router-dom";
import ProfilePicture from "../profile-picture/profile-picture";
import { formatTimeDiff } from "../../helpers/date";
import heartInactive from "../../assets/svgs/heart-inactive.svg";
import heartActive from "../../assets/svgs/heart-active.svg";
import "./comment.styles.scss";

const Comment = ({ ownerId, commentDetails, onLike }) => {
    const navigate = useNavigate();
    const { userId, commentId, imageUrl, name, username, comment, createdAt, commentLikes, isLiked } = commentDetails;
    
    const onLikeHandler = () => {
        onLike(commentId, isLiked);
    }

    const handleClick = () => {
        navigate(`/account/${username}`)
    }

    return (
        <div className="comment">
        <ProfilePicture imageUrl={imageUrl} diameter="40px" onClickHandler={handleClick}/>
        <div className="comment-details-container">
            <p className="name" onClick={handleClick}>{name}{userId === ownerId && <span className="creator">Creator</span>}</p>
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