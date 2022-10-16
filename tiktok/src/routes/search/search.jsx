import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePageUpdateContext } from "../../hooks/pageContext";
import { userSearch } from "../../services/users";
import { videoSearch } from "../../services/videos";
import { likeVideo, unlikeVideo } from "../../services/likes";
import { followUser, unfollowUser } from "../../services/userFollowing";
import AccountFullDetails from "../../components/account-full-details/account-full-details";
import ProfilePicture from "../../components/profile-picture/profile-picture";
import VideoFullScreen from "../../components/video-full-screen/video-full-screen";
import "./search.styles.scss";


const Search = () => {
    const { search } = useParams();
    const setPage = usePageUpdateContext();
    const [isFullVideoOpen, setIsFullVideoOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [videos, setVideos] = useState([]);
    const [selectedVideoId, setSelectedVideoId] = useState("");
    const selectedVideo = videos.find(video=>video.videoId === selectedVideoId)

    useEffect(() => {
        setPage("Search");
        userSearch(search).then(res => {
            setUsers(res.users);
        });
        videoSearch(search).then(res => {
            setVideos(res.videos);
        })
    }, [search])

    const handleFollowUser = () => {
        const { userId, isFollowing } = selectedVideo;
        if (!isFollowing) {
            followUser(userId);
        }
        else {
            unfollowUser(userId);
        }
        setVideos(prevVideos => prevVideos.map(video => {
            return video.userId === userId ?
                {
                    ...video,
                    isFollowing: !isFollowing,
                }
                : video   
            })
        )
    }

    const handleMouseOver = (event) => {
        event.target.play();
    }

    const handleMouseOut = (event) => {
        event.target.pause();
    }

    const handleLikeClick = () => {
        const { videoId : id, isLiked } = selectedVideo;
        isLiked ? unlikeVideo(id) : likeVideo(id);
        
        setVideos(prevVideos => prevVideos.map(video => {
            return video.videoId === id ?
                {
                    ...video,
                    isLiked: !video.isLiked,
                    likesCount: (video.isLiked ? video.likesCount - 1 : video.likesCount + 1)
                }
                : video;
            })
        )
    }

    const handleVideoClick = (video) => {
        if (!isFullVideoOpen) {
            setSelectedVideoId(video.videoId);
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "unset";
        }
        setIsFullVideoOpen(prev => !prev);
    }

    return (
        <>
            <div className="search-container">
                {
                    users.length > 0 && 
                    <>
                        <h2>Accounts</h2>
                        <div className="search-accounts-container">
                        {
                            users.map(user => {
                                return <AccountFullDetails user={user} />
                            })
                        }
                        </div>
                    </>
                }
                {
                    videos.length > 0 &&
                    <>
                        <h2>Videos</h2>
                        <div className="search-videos-container">
                            {
                                videos.map((video) => {
                                    return <div key={video.videoId}
                                        className="video-card"
                                        onClick={() => handleVideoClick(video)}
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
                    </>
                }
            </div>
            {isFullVideoOpen && <VideoFullScreen video={videos.find(video => video.videoId === selectedVideoId )} onCloseHandler={handleVideoClick} onFollowHandler={handleFollowUser} onLikeHandler={handleLikeClick} />}
        </>
    );
};

export default Search;
