import { useNavigate } from "react-router-dom";
import ProfilePicture from "../profile-picture/profile-picture";
import "./post-details.styles.scss";

const PostDetails = ({ imageUrl, username, name, caption, isFollowing, onFollowHandler }) => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/account/${username}`)
    }
    return (
        <div className="post-details-container">         
            <div className="details-container" onClick={handleNavigate}>
                <ProfilePicture imageUrl={imageUrl} diameter="56px"/>
                <div>
                    <p className="username">{username}</p>
                    <p className="name">{name}</p>
                    <p className="caption" onClick={(event)=>event.stopPropagation()}>{caption}</p>
                </div>
            </div>
            <button className={ isFollowing ? "button-active": ""} onClick={onFollowHandler}>{isFollowing ? "Following" : "Follow"}</button>
        </div>
    );
};

export default PostDetails;