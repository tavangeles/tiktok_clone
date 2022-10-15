import "./profile-picture.styles.scss";

const ProfilePicture = ({imageUrl, diameter, isObjectUrl}) => {
    return (
        <img
            className="profile-picture"
            src={isObjectUrl ? imageUrl : `${process.env.REACT_APP_API_URL}images/profile_pictures/${imageUrl}`}
            alt="profile-pic"
            style={{ width: diameter, height: diameter }}
        />
    );
};

export default ProfilePicture;