import React, { useState } from 'react';
import { useSelector, useDispatch, useHistory } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { addOnePost } from '../../store/post';
import { signUp } from '../../store/session';
import './NewPostForm.css'

const AddPostForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [image, setImage] = useState("")
    const [caption, setCaption] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault()
        const postDetails = {image, caption}
        const res = await dispatch(addOnePost(postDetails))
        if (res) history.push('/')
    }

    return (
        <form onSubmit={onSubmit}>

        </form>
    )
}

export default AddPostForm
