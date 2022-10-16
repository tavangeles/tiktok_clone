import "./profile-picture.styles.scss";

const ProfilePicture = ({imageUrl, diameter, isObjectUrl, onClickHandler}) => {
    return (
        <img
            className="profile-picture"
            src={isObjectUrl ? imageUrl : `${process.env.REACT_APP_API_URL}images/profile_pictures/${imageUrl}`}
            alt="profile-pic"
            style={{ width: diameter, height: diameter }}
            onClick={onClickHandler}
        />
    );
};

export default ProfilePicture;