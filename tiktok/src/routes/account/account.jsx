import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../hooks/userContext";
import { getUserDetails } from "../../services/users";
import { followUser, unfollowUser } from "../../services/userFollowing";
import EditProfile from "../../components/edit-profile/edit-profile";
import ProfilePicture from "../../components/profile-picture/profile-picture";
import Sidebar from "../../components/sidebar/sidebar";
import edit from "../../assets/svgs/edit.svg";
import "./account.styles.scss";

const Account = () => {
    const user = useUserContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [videos, setVideos] = useState([]);
    const { username } = useParams();
    const { userId, name, imageUrl, bio, followingCount, followersCount, likes, isFollowing} = userDetails;

    const inputRef = useRef();

    const handleOpenModal = () => {
        setIsModalOpen(prevState => !prevState);
    }

    const setAccountDetails = (newUserDetails) => {
        setUserDetails(prevUserDetails => {
            return { ...prevUserDetails, ...newUserDetails }
        });
    }

    const handleFollowUser = () => {
        if (!isFollowing) {
            followUser(userId);
        }
        else {
            unfollowUser(userId);
        }
        setUserDetails(prevUserDetails => {
            return { ...prevUserDetails, isFollowing: !prevUserDetails.isFollowing };
        })
    }

    const handleMouseOver = () => {
        inputRef.current.play();
    }

    const handleMouseOut = () => {
        inputRef.current.pause();
    }

    useEffect(() => {
        getUserDetails(username).then(res => {
            setUserDetails(res.userDetails);
            setVideos(res.videos)
        });
    }, [])

    return (
        <>
            <div className="account-container" style={{ backgroundColor: isModalOpen ? 0.5 : 1 }} >
                <Sidebar />
                <div className="container">
                    <div className="header">
                        {imageUrl && <ProfilePicture imageUrl={imageUrl} diameter={"128px"}/>}
                        <div className="detail-container">
                            <h1>{username}</h1>
                            <p>{name}</p>
                            {user?.username === username ?
                                <button onClick={handleOpenModal}><img src={edit} alt="edit" />Edit profile</button> : 
                                <button onClick={handleFollowUser}>{isFollowing ? "Following" : "Follow"}</button>
                            }
                        </div>
                    </div>
                    <div className="bio-container">
                        <div className="followers-container">
                            <p><span className="bold">{followingCount}</span>Following</p>
                            <p><span className="bold">{followersCount}</span> Followers</p>
                            <p><span className="bold">{likes}</span> Likes</p>
                        </div>
                        <p>{bio !== "" ? bio : "No bio yet."}</p>
                    </div>
                    <div className="">
                        <h2>Videos</h2>
                        <div className="videos-container">
                            {videos.map((video) => {
                                return <div key={video.videoId}
                                    className="video-card"
                                    onMouseOver={handleMouseOver}
                                    onMouseOut={handleMouseOut}
                                >
                                    <video loop muted ref={inputRef}>
                                        <source src={`${process.env.REACT_APP_API_URL}videos/${video.videoUrl}`} type="video/mp4" />
                                    </video>
                                    <p>{video.caption}</p>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>    
            {isModalOpen && <EditProfile userDetails={userDetails} openModalHandler={handleOpenModal} accountDetailsHandler={setAccountDetails} />}
        </>
    );
};

export default Account;
