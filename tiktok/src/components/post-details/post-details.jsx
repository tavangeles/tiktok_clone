import { useNavigate } from "react-router-dom";
import { usePageContext } from "../../hooks/pageContext";
import Caption from "../caption/caption";
import ProfilePicture from "../profile-picture/profile-picture";
import User from "../user/user";
import "./post-details.styles.scss";

const PostDetails = ({ imageUrl, username, name, caption, isFollowing, onFollowHandler }) => {
    const navigate = useNavigate();
    const page = usePageContext();
    const handleNavigate = () => {
        navigate(`/account/${username}`)
    }
    
    return (
        <div className="post-details-container">         
            <div className="details-container">
                <User user={{ imageUrl, username, name }} pictureDiameter="56px">
                    <Caption>{caption}</Caption>
                </User>
                {/* <ProfilePicture imageUrl={imageUrl} diameter="56px" />
                <div>
                    <p className="username">{username}</p>
                    <p className="name">{name}</p>
                    <pre className="caption" onClick={(event)=>event.stopPropagation()}>{caption}</pre>
                </div> */}
            </div>
            {page !== "Following" && <button className={isFollowing ? "button-active" : ""} onClick={onFollowHandler}>{isFollowing ? "Following" : "Follow"}</button>}
        </div>
    );
};

export default PostDetails;