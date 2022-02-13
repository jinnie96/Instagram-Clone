import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../store/users';


const EditProfileModal = ({ setShowModal, user, setUpdate }) => {
    const [username, setUsername] = useState(user.username)
    const [firstName, setFirstName] = useState(user.first_name)
    const [lastName, setLastName] = useState(user.last_name)
    const [email, setEmail] = useState(user.email)
    const [biography, setBiography] = useState(user.biography)
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()


    const handleSubmit = async (e) => {
        e.preventDefault()

        const info = {username, firstName, lastName, email, biography}
        const data = await dispatch(userActions.updateUserProfile(user.id, info))
        if(data) {
            // console.log("DATA", data);
            setErrors(data)
        } else {
            setUpdate(true)
            setShowModal(false)
        }
    }

    const handleCancel = (e) => {
        e.preventDefault()
        return setShowModal(false)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <ul>
                    {console.log("########################", errors)}
                    {errors?.map((error, ind) => (
                        <li key={ind}>{error}</li>
                    ))}
                </ul>
                <input
                    name='username'
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    name='first_name'
                    type='text'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    name='last_name'
                    type='text'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input
                    name='email'
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    name='biography'
                    type='textarea'
                    value={biography || ""}
                    onChange={(e) => setBiography(e.target.value)}
                />
                <button type="submit">Submit</button>
                <button onClick={handleCancel}>Cancel</button>
            </form>
        </>
    )
}

export default EditProfileModal
