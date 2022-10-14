
import Reactions from "../reactions/reactions";
import "./video.styles.scss";

const Video = ({ isLiked, videoUrl, likesCount, commentsCount, targetRef, onFullScreen, onLikeHandler }) => {
    return (
        <div className="video-container">
            <div className="full-screen-handler" onClick={onFullScreen}></div>
            <video controls loop ref={targetRef}>
                <source src={`${process.env.REACT_APP_API_URL}videos/${videoUrl}`} type="video/mp4" />
            </video>
            <Reactions isLiked={isLiked} likesCount={likesCount} commentsCount={commentsCount} onLikeHandler={onLikeHandler} onCommentHandler={onFullScreen} />
        </div>
    );
};

export default Video;

