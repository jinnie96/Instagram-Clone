import React, { useState, useEffect } from "react";
import { getFollowPosts } from "../../../store/post";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";


const ViewFollowedPosts = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    console.log("UserSTATE@@@@@", user)
    const state = useSelector(state => state)
    console.log("STATE@@@@@@", state)
    const id = user.id
    useEffect((id) => {
        console.log("USEEFFECTTTTTTT")
        dispatch(getFollowPosts(id))
        // const res = await fetch('/api/photofeed/');
        // if (res.ok) {
            //     const data = await res.json();
            //     console.log(data.images, "@@@@@@@@@@")
            //     setImages(data.images)
            // } else {
                //     console.log("error")
                // }
            }, [dispatch])
            const followedPosts = useSelector(state => state.posts)
            // console.log("FOLLOWED@@@@@@", followedPosts)
    console.log("FOLLLOWED POST@@@@@@", followedPosts)
    return (
        // <div style={{
        //     display:"flex",
        //     flexDirection: "column",
        //     width: "100vw",
        //     alignItems: "center"
        // }}>
        //     <h1>Images</h1>
        //     {followedPosts.map(im => (
        //         <div
        //             key={im.id}
        //             style={{
        //                 backgroundImage: `url(${im.url})`,
        //                 backgroundSize: "contain",
        //                 backgroundRepeat: "no-repeat",
        //                 backgroundPosition: "center",
        //                 width: "50%",
        //                 height: 250,
        //                 margin: 10,
        //                 // width: "auto",
        //             }} />
        //     ))}
        // </div>
        <div>Follow Page</div>
    )
}

export default ViewFollowedPosts;
