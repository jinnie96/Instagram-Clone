import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import * as postActions from '../../../store/post';



const UploadPostModals = ({ setShowModal }) => {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [imageLoading, setImageLoading] = useState(false);
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const dispatch = useDispatch();

    // window.history.replaceState(null, 'Upload Post', '/create');

    const current_user = useSelector(state => state.session.user)
    const id = current_user.id


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("caption", caption);

        setImageLoading(true);

        const res = await fetch('/api/posts/create', {
            method: "POST",
            body: formData
        });
        if (res.ok) {
            dispatch(postActions.getFollowPosts(id)); // returns state unaltered, but triggers dispatch!
            await res.json();
            setImageLoading(false);
            setShowModal(false);
            history.push("/");
        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            console.log("error");
        }

    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                name='image'
                type="file"
                accept="image/*"
                onChange={updateImage}
            />
            <textarea
                name='caption'
                rows="5"
                type="text"
                value={caption}
                placeholder="Enter a caption..."
                onChange={(e) => setCaption(e.target.value)}
            />
            <button type="submit">Submit</button>
            {(imageLoading) && <p>Loading...</p>}
        </form>
    )
}

export default UploadPostModals;