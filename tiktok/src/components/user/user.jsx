import ProfilePicture from "../profile-picture/profile-picture";
import { useNavigate } from 'react-router-dom';
import "./user.styles.scss";

const User = ({ user, pictureDiameter, children }) => {
    const { imageUrl, username, name } = user;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/account/${username}`)
    }

    return (
        <div className="user">
            <ProfilePicture imageUrl={imageUrl} diameter={pictureDiameter} onClick={handleClick}/>
            <div>
                <p className="username" onClick={handleClick}>{username}</p>
                <p className="name" onClick={handleClick}>{name}</p>
                {children}
            </div>
        </div>
    );
};

export default User;
