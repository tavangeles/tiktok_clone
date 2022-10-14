import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../hooks/userContext";
import { usePageUpdateContext } from "../../hooks/pageContext";
import { getUserDetails } from "../../services/users";
import { followUser, unfollowUser } from "../../services/userFollowing";
import EditProfile from "../../components/edit-profile/edit-profile";
import ProfilePicture from "../../components/profile-picture/profile-picture";
import Sidebar from "../../components/sidebar/sidebar";
import VideoFullScreen from "../../components/video-full-screen/video-full-screen";
import edit from "../../assets/svgs/edit.svg";
import userIcon from "../../assets/images/user.png";
import "./account.styles.scss";

const Account = () => {
    const user = useUserContext();
    const setPage = usePageUpdateContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFullVideoOpen, setIsFullVideoOpen] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [videos, setVideos] = useState([]);
    const [video, setVideo] = useState({});
    const { username } = useParams();
    const { userId, name, imageUrl, bio, followingCount, followersCount, likes, isFollowing} = userDetails;

    useEffect(() => {
        setPage("Account");
    }, [])
    
    useEffect(() => {
        getUserDetails(username).then(res => {
            setUserDetails(res.userDetails);
            setVideos(res.videos)
        });
    }, [username])

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
            return {
                ...prevUserDetails,
                isFollowing: !prevUserDetails.isFollowing,
                followersCount: prevUserDetails.isFollowing ? prevUserDetails.followersCount - 1 : prevUserDetails.followersCount + 1
            };
        })
    }

    const handleMouseOver = (event) => {
        event.target.play();
    }

    const handleMouseOut = (event) => {
        event.target.pause();
    }

    const handleVideoClick = (video) => {
        if (!isFullVideoOpen) {
            setVideo(video)
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "unset";
        }
        setIsFullVideoOpen(prev => !prev);
    }

    return (
        <>
            <div className="account-container" style={{ backgroundColor: isModalOpen ? 0.5 : 1 }} >
                <Sidebar />
                <div className="container">
                    <div className="header">
                        {imageUrl && <ProfilePicture imageUrl={imageUrl} diameter={"128px"}/>}
                        <div className="detail-container">
                            <h1>{username}</h1>
                            <h2>{name}</h2>
                            {user?.username === username ?
                                <button onClick={handleOpenModal}><img src={edit} alt="edit" />Edit profile</button> : 
                                <button className= {!isFollowing ? "btn-primary" : "btn-secondary"} onClick={handleFollowUser}>{isFollowing ? "Following" : "Follow"}</button>
                            }
                        </div>
                    </div>
                    <div className="bio-container">
                        <div className="followers-container">
                            <p><span className="bold">{followingCount}</span>Following</p>
                            <p><span className="bold">{followersCount}</span> Followers</p>
                            <p><span className="bold">{likes}</span> Likes</p>
                        </div>
                        <pre>{bio !== "" ? bio : "No bio yet."}</pre>
                    </div>
                    <div className="">
                        <h2>Videos</h2>
                        <div className="videos-container">
                            { !videos.length &&
                                <div className="no-content">
                                    <img src={userIcon} alt="user" />
                                    <h3>No content</h3>
                                    <p>This user has not published any videos.</p>
                                </div>
                            }
                            {videos.map((video) => {
                                return <div key={video.videoId}
                                    className="video-card"
                                    onClick={() =>handleVideoClick(video)}
                                >
                                    <video loop
                                        muted
                                        onMouseOver={handleMouseOver}
                                        onMouseOut={handleMouseOut}
                                    >
                                        <source src={`${process.env.REACT_APP_API_URL}videos/${video.videoUrl}`} type="video/mp4" />
                                    </video>
                                    <p className="caption">{video.caption}</p>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>    
            {isModalOpen && <EditProfile userDetails={userDetails} openModalHandler={handleOpenModal} accountDetailsHandler={setAccountDetails} />}
            {isFullVideoOpen && <VideoFullScreen video={video} onCloseHandler={handleVideoClick} onFollowHandler={handleFollowUser} />}
        </>
    );
};

export default Account;
