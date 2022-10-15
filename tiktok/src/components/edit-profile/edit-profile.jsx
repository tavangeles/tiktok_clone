import { useState } from "react";
import { updateUser } from "../../services/users";
import { useUserContext, useUserUpdateContext } from "../../hooks/userContext";
import ProfilePicture from "../profile-picture/profile-picture";
import Modal from "../modal/modal";
import close from "../../assets/svgs/close.svg";
import change from "../../assets/svgs/change.svg";
import "./edit-profile.styles.scss";


const EditProfile = ({ userDetails, openModalHandler, accountDetailsHandler }) => {
    const setUser = useUserUpdateContext();
    const [formFields, setFormFields] = useState({ ...userDetails, image: "" });
    const { name, bio, imageUrl, image } = formFields;


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields(prevFormFields => {
            return { ...prevFormFields, [name]: value }
        });
    }

    const handlePictureChange = (event) => {
        if (event.target.files.length <= 0) {
            return;
        }

        setFormFields(prevFormFields => {
            return { ...prevFormFields, "image": event.target.files[0]}
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        updateUser(formFields).then(res => {
            setUser(res.userDetails);
            accountDetailsHandler(res.userDetails);
            openModalHandler();
        })
    }

    return (
        <Modal>
            <form onSubmit={handleSubmit} className="edit-profile-container">
                <div className="header">
                    <h2>Edit profile</h2>
                    <button onClick={openModalHandler}><img src={close} alt="close" /></button>
                </div>
                <div className="content">
                    <div className="container">
                        <h3>Profile photo</h3>
                        <div className="profile-pic-container">
                            <ProfilePicture imageUrl={image ? URL.createObjectURL(image) : imageUrl} isObjectUrl={image} diameter={"128px"}/>
                            <label>
                                <input type="file" onChange={handlePictureChange} name="img" accept="image/*"/>
                                <img src={change} alt="edit" />
                            </label>

                        </div>
                    </div>
                    <div className="container">
                        <h3>Name</h3>
                        <input type="text"
                            name="name"
                            placeholder="Name"
                            value={name}
                            onChange={handleChange}
                            />
                    </div>
                    <div className="container">
                        <h3>Bio</h3>
                        <textarea
                            name="bio"
                            placeholder="Bio"
                            value={bio}
                            onChange={handleChange}
                            />
                    </div>
                </div>
                <div className="footer">
                    <button type="button" onClick={openModalHandler}>Cancel</button>
                    <button className="btn-primary">Save</button>
                </div>
            </form>
        </Modal>
    );
};

export default EditProfile;