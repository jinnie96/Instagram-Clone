import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as userActions from '../../store/users';
import './UserEdit.css';
import noPic from './no-profile-alt.jpg';



const EditProfileModal = ({ setShowModal, user, setUpdate }) => {
    const [username, setUsername] = useState(user.username);
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);
    const [biography, setBiography] = useState(user.biography);
    const [profilePicture, setProfilePicture] = useState(noPic);
    const [errors, setErrors] = useState([]);
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const dispatch = useDispatch();

    const current_user = useSelector((state) => state.session.user.id);
    const id = current_user.id;

    console.log(current_user);


    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const info = {username, firstName, lastName, email, biography}
    //     const data = await dispatch(userActions.updateUserProfile(user.id, info));

    //     if(data) {
    //         setErrors(data)
    //     } else {
    //         setUpdate(true)
    //         setShowModal(false)
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("username", username);
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("email", email);
        formData.append("biography", biography);
        formData.append("profile_picture", profilePicture);

        const res = await fetch(`/api/users/${current_user}/account/edit`, {
            method: "PUT",
            body: formData
        })

        if (res.ok) {
            dispatch(userActions.getUserProfile(id));
            await res.json();
            setShowModal(false)
            history.push("/");
        } else if (res.status < 500) {
            const data = await res.json()
            if (data.errors) {
                return data.errors
            }
        } else {
            return ['An error occured. Please try again.']
        }
    };

    const updateImage = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
    };

    const handleCancel = (e) => {
        e.preventDefault()
        return setShowModal(false)
    };


    return (
        <div className='edit-user-container'>
            <div>Edit profile</div>
            <form className='edit-user-form' onSubmit={handleSubmit}>
                <ul className="errors">
                    {errors?.map((error, ind) => (
                        <li key={ind}>{error}</li>
                    ))}
                </ul>
                <fieldset>
                    <legend>Username</legend>
                    <input
                        name='username'
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <legend>First name</legend>
                    <input
                        name='first_name'
                        type='text'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <legend>Last name</legend>
                    <input
                        name='last_name'
                        type='text'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <legend>Email</legend>
                    <input
                        name='email'
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <legend>Biography</legend>
                    <input
                        name='biography'
                        type='textarea'
                        value={biography || ""}
                        onChange={(e) => setBiography(e.target.value)}
                    />
                </fieldset>
                <input
                    className='update-prof-image-input'
                    name='image'
                    type="file"
                    accept="image/*"
                    required
                    onChange={updateImage}
                />
                <div className='edit-user-btns'>
                    <button id='edit-user-submit' type="submit">Submit</button>
                    <button id='edit-user-cancel' onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default EditProfileModal
