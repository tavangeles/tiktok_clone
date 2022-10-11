import ProfilePicture from "../profile-picture/profile-picture";
import { useNavigate } from 'react-router-dom';
import "./user.styles.scss";

const User = ({ user }) => {
    const { imageUrl, username, name } = user;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/account/${username}`)
    }

    return (
        <div className="user-container" onClick={handleClick}>
            <ProfilePicture imageUrl={imageUrl} diameter="32px"/>
            <div>
                <p className="username">{username}</p>
                <p className="name">{name}</p>
            </div>
        </div>
    );
};

export default User;
