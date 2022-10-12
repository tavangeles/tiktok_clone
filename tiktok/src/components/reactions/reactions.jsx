import heart from "../../assets/svgs/heart.svg";
import comment from "../../assets/svgs/comment.svg";
import "./reactions.styles.scss";

const Reactions = ({ likesCount, commentsCount, onLikeHandler}) => {
    return (
        <div className="reactions-container">
            <div>
                <img src={heart} alt="heart" onClick={onLikeHandler} />
                <p>{likesCount}</p>
            </div>
            <div>
                <img src={comment} alt="comment" />
                <p>{commentsCount}</p>
            </div>
        </div>
    );
};

export default Reactions;

