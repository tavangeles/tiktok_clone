import heart from "../../assets/svgs/heart.svg";
import heartActive from "../../assets/svgs/heart-active.svg";
import comment from "../../assets/svgs/comment.svg";
import "./reactions.styles.scss";

const Reactions = ({ isLiked, likesCount, commentsCount, onLikeHandler, onCommentHandler }) => {
    return (
        <div className="reactions-container">
            <div onClick={onLikeHandler}>
                <div className="reaction-container">
                    <img src={!isLiked ? heart : heartActive} alt="heart" />
                </div>
                <p>{likesCount}</p>
            </div>
            <div onClick={onCommentHandler} >
                <div className="reaction-container">
                    <img src={comment} alt="comment" />
                </div>
                <p>{commentsCount}</p>
            </div>
        </div>
    );
};

export default Reactions;

