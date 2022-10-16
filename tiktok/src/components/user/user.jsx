import ProfilePicture from "../profile-picture/profile-picture";
import { useNavigate } from "react-router-dom";
import verifiedIcon from "../../assets/images/verified.png"
import "./user.styles.scss";

const User = ({ user, pictureDiameter, details, children }) => {
    const { imageUrl, username, name } = user;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/account/${username}`)
    }

    return (
        <div className="user">
            <ProfilePicture imageUrl={imageUrl} diameter={pictureDiameter} onClickHandler={handleClick}/>
            <div>
                <p className="username" onClick={handleClick}>{username}</p>
                <p className="name" onClick={handleClick}>{name} <span className="details">{details}</span></p>
                {children}
            </div>
        </div>
    );
};

export default User;
