import "./video-full-screen.styles.scss";

const VideoFullScreen = () => {
    return (
        <div className="video-full-screen">
            <video loop autoPlay controls controlslist="nofullscreen">
                <source src={`${process.env.REACT_APP_API_URL}videos/0afedf15-a0ef-42d3-9cab-134e8c49df44.mp4`} type="video/mp4" />
            </video>
            <div className="comments-container">
                
            </div>
        </div >
    )
};

export default VideoFullScreen;

