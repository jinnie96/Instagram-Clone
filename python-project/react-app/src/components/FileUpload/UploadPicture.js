import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import * as postActions from '../../store/post';



const UploadPicture = () => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [imageLoading, setImageLoading] = useState(false);
    const dispatch = useDispatch();
    const current_user = useSelector(state => state.session.user)
    const user_id = current_user.id

    function stringify(obj) {
        const replacer = [];
        for (const key in obj) {
            replacer.push(key)
        }
        return JSON.stringify(obj, replacer);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const newImage = stringify(image[0])
        formData.append("image", newImage);
        formData.append("caption", caption);
        formData.append("user_id", user_id)
        // formData.forEach((value, key) => {
        //     console.log(key, value);
        // })
        setImageLoading(true);
        // const res = await fetch('/api/posts/create', {
        //     method: "POST",
        //     body: formData
        // });
        // if (res.ok) {
        //     await res.json();
        //     setImageLoading(false);
        //     history.push("/");
        // }
        // else {
        //     setImageLoading(false);
        //     // a real app would probably use more advanced
        //     // error handling
        //     console.log("error");
        // }

        // await dispatch(addOnePost(image, caption))
        await dispatch(postActions.addOnePost(formData))

        setImageLoading(false)
        history.push('/')
    }

    const updateImage = (e) => {
        const file = e.target.files;
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

export default UploadPicture;
