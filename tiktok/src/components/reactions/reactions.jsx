import Reaction from "../reaction/reaction";
import heart from "../../assets/svgs/heart.svg";
import heartActive from "../../assets/svgs/heart-active.svg";
import comment from "../../assets/svgs/comment.svg";
import "./reactions.styles.scss";

const Reactions = ({ isLiked, likesCount, commentsCount, onLikeHandler, onCommentHandler }) => {
    return (
        <div className="reactions">
            <Reaction name={"heart"} isActive={isLiked} icon={heart} activeIcon={heartActive} reactionCount={likesCount} onClickHandler={onLikeHandler} />
            <Reaction name={"comment"} icon={comment} reactionCount={commentsCount} onClickHandler={onCommentHandler} />
        </div>
    );
};

export default Reactions;

