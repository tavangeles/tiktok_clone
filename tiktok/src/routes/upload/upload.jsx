import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/userContext";
import { updateVideoDetails, uploadVideo } from "../../services/videos";
import ProgressBar from "../../components/progress-bar/progress-bar";
import cloud from "../../assets/svgs/cloud.svg";
import check from "../../assets/svgs/check.svg";
import "./upload.styles.scss";
import Modal from "../../components/modal/modal";

const defaultFormFields = {
    caption: "",
    privacy: 1,
    video: null
}

const Upload = () => {
    const user = useUserContext();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [uploadPercentage, setUploadPercentage] = useState(null);
    const [uploadedVideo, setUploadedVideo] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { videoId, filename } = uploadedVideo;
    const { caption, privacy, video } = formFields;
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
    }, [])

    useEffect(() => {
        if (formFields.video) {
            uploadVideo(formFields, setUploadPercentage).then(res => { 
                setUploadedVideo(res.data);
            })
        }
    }, [formFields.video])

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        const inputValue = name === "video" ? files[0] : value; 
        setFormFields(prevFormFields => {
            return { ...prevFormFields, [name]: inputValue }
        });
        if (video) {
            
        }
    }
    
    const handleCancelClick = (event) => {

    }

    const handleSubmit = async (event) => {
        event.preventDefault();        
        // validate caption
        // validate id
        updateVideoDetails(videoId, formFields).then(res=>console.log(res));
    }

    const handleReplaceClick = () => {
        setIsModalOpen(prevState => !prevState);
        setUploadedVideo("");
        setUploadPercentage(null);
    }

    const handleOpenModal = () => {
        setIsModalOpen(prevState => !prevState);
    }

    return (
        <>
            <form className="upload-container" onSubmit={handleSubmit}>
                <h2>Upload video</h2>
                <p className="description">Post a video to your account</p>
                <div className="container">
                    {!uploadedVideo &&
                        <label className="upload-video">
                            {!uploadPercentage &&
                                <>
                                    <img src={cloud} alt="cloud" />
                                    <p className="bold">Select video to upload</p>
                                    <p>Or drag and drop a file</p>
                                    <p>MP4 or WebM</p>
                                    <p>720x1280 resolution or higher</p>
                                    <p>Up to 10 minutes</p>
                                    <p>Less than 2 GB</p>
                                    <div className="button">Select file</div>
                                    <input type="file" accept="video/mp4" name="video" placeholder="Select file" onChange={handleChange} />
                                </>
                            }
                            {uploadPercentage && uploadPercentage < 100 &&
                                <>
                                    <ProgressBar
                                        progress={uploadPercentage}
                                        size={80}
                                        strokeWidth={8}
                                        circleOneStroke="#bdbdbb"
                                        circleTwoStroke="#ea284d"
                                        />
                                    <p className="video-name">{video.name}</p>
                                </>
                            }
                        </label>
                    }
                    {filename &&
                        <div className="video-player-container">
                            <video id="videoPlayer" width="100%" height="512px" controls autoPlay muted loop>
                                <source src={`http://localhost:8000/videos/${filename}`} type="video/mp4" />
                            </video>
                            <div className="change-video-container">
                                <p>
                                    <img src={check} alt="check" />
                                    <span>{video.name}</span>
                                </p>
                                <button type="button" onClick={handleOpenModal}>Change video</button>
                            </div>
                        </div>
                    }
                    <div className="upload-description">
                        <p className="bold">Caption</p>
                        <input
                            type="text"
                            name="caption"
                            placeholder="Caption"
                            onChange={handleChange}
                            value={caption}
                            autoComplete="off"
                            />
                        <p className="bold">Who can view this video</p>
                        <select name="privacy" value={privacy} onChange={handleChange}>
                            <option value="1">Public</option>
                            <option value="2">Private</option>
                        </select>
                        <div>
                            <button type="button" onClick={handleCancelClick}>Discard</button>
                            <button className="active">Post</button>
                        </div>
                    </div>
                </div>
            </form>
            { isModalOpen &&
                <Modal onCloseHandler={handleOpenModal}>
                    <div className="popup">
                        <h2>Replace this video?</h2>
                        <p>Caption and video settings will still be saved</p>
                        <button onClick={handleReplaceClick}>Replace</button>
                        <button onClick={handleOpenModal}>Continue editing</button>
                    </div>
                </Modal>
            }
        </>
    );
};

export default Upload;
