import { useEffect, useState } from "react";
import { videoGetForYou } from "../../services/videos";
import VideoPost from "../video-post/video-post";
import "./for-you.styles.scss";

const ForYou = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        videoGetForYou().then((res) => {
            setVideos(res.videos);
        });
    }, [])
    return (
        <div className="for-you-container">
            {videos.map(video => {
                return <VideoPost key={video.videoId} video={video} />
            })}
        </div>
    );
};

export default ForYou;
