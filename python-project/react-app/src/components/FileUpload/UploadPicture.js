import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { addOnePost } from '../../store/post';



const UploadPicture = () => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [imageLoading, setImageLoading] = useState(false);
    const dispatch = useDispatch();

    // const handleSubmit = async (e) => {
    //     console.log("++++++++ inside handle submit")
    //     e.preventDefault();
    //     const data = await dispatch(addOnePost(image, caption));
    //     if (data) {
    //         history.push("/");
    //     } else {
    //         console.log("ERRORRRRRRRRRRRRR")
    //     }
    // };

    const handleSubmit = async (e) => {
        console.log("WE'RE INSIDE HANDLE SUBMIT")

        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        // formData.append("caption", caption);

        setImageLoading(true);


        const res = await fetch('/api/posts/create', {
            method: "POST",
            body: formData
        });

        // const data = await dispatch(addOnePost(image, caption));


        if (res.ok) {
            await res.json();
            setImageLoading(false);
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
                type="file"
                accept="image/*"
                onChange={updateImage}
            />
            <textarea
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
