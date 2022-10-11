import ProfilePicture from "../profile-picture/profile-picture";
import "./user.styles.scss";

const User = ({ user }) => {
    const { imageUrl, username, name } = user;
    return (
        <div className="user-container">
            <ProfilePicture imageUrl={imageUrl} diameter="32px"/>
            <div>
                <p className="username">{username}</p>
                <p className="name">{name}</p>
            </div>
        </div>
    );
};

export default User;
