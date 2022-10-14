import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePageUpdateContext } from "../../hooks/pageContext";
import { userSearch } from "../../services/users";
import { videoSearch } from "../../services/videos";
import AccountFullDetails from "../../components/account-full-details/account-full-details";
import "./search.styles.scss";
import ProfilePicture from "../../components/profile-picture/profile-picture";
import VideoFullScreen from "../../components/video-full-screen/video-full-screen";

const Search = () => {
    const { search } = useParams();
    const setPage = usePageUpdateContext();
    const [users, setUsers] = useState([]);
    const [videos, setVideos] = useState([]);
    const [isFullVideoOpen, setIsFullVideoOpen] = useState(false);
    const [video, setVideo] = useState({});

    useEffect(() => {
        setPage("Search");
        userSearch(search).then(res => {
            setUsers(res.users);
        });
        videoSearch(search).then(res => {
            setVideos(res.videos);
        })
    }, [search])

    // const handleFollowUser = () => {
    //     if (!isFollowing) {
    //         followUser(userId);
    //     }
    //     else {
    //         unfollowUser(userId);
    //     }
    //     setUserDetails(prevUserDetails => {
    //         return {
    //             ...prevUserDetails,
    //             isFollowing: !prevUserDetails.isFollowing,
    //             followersCount: prevUserDetails.isFollowing ? prevUserDetails.followersCount - 1 : prevUserDetails.followersCount + 1
    //         };
    //     })
    // }

    const handleMouseOver = (event) => {
        event.target.play();
    }

    const handleMouseOut = (event) => {
        event.target.pause();
    }

    const handleVideoClick = (video) => {
        if (!isFullVideoOpen) {
            setVideo(video)
        }
        else {
            setVideo({});
        }
        setIsFullVideoOpen(prev => !prev);
    }
    return (
        <>
            <div className="search-container">
                <h2>Accounts</h2>
                <div className="search-accounts-container">
                    {
                        users.map(user => {
                            return <AccountFullDetails user={user} />
                        })
                    }
                </div>
                <h2>Videos</h2>
                <div className="search-videos-container">
                    {
                        videos.map((video) => {
                            console.log(video);
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
                                <div className="video-details">
                                    <ProfilePicture imageUrl={video.imageUrl} diameter={"24px"} />
                                    <p className="username">{video.username}</p>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
            {isFullVideoOpen && <VideoFullScreen video={video} onCloseHandler={handleVideoClick} onFollowHandler={()=>{}} />}
        </>
    );
};

export default Search;
