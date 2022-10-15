import ProfilePicture from "../profile-picture/profile-picture";
import { useNavigate } from "react-router-dom";
import "./account-full-details.styles.scss";

const AccountFullDetails = ({ user }) => {
    const { imageUrl, username, name, bio, followersCount } = user;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/account/${username}`)
    }

    return (
        <div className="account-full-details-container" onClick={handleClick}>
            <ProfilePicture imageUrl={imageUrl} diameter="56px"/>
            <div>
                <p className="username">{username}</p>
                <p className="name">{name} <span className="followers">{followersCount}</span> {followersCount > 1 ? "Followers" : "Follower"}</p>
                <p className="bio">{bio}</p>
            </div>
        </div>
    );
};

export default AccountFullDetails;