import React, { useState, useEffect } from "react";
import { getAllPosts, getFollowPosts } from "../../../store/post";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";


const ViewAllPosts = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    console.log("UserSTATE@@@@@", user)
    const statePosts = useSelector(state => state.posts)
    console.log("STATE@@@@@@", statePosts)
    const id = user.id
    useEffect(() => {
        console.log("USEEFFECTTTTTTT")
        dispatch(getAllPosts())
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
    const followedArr = Object.values(followedPosts)
    console.log(followedArr)
    followedArr.map(im => console.log(im.image, im.id))
    return (
        <div style={{
            display:"flex",
            flexDirection: "column",
            width: "100vw",
            alignItems: "center"
        }}>
            <h1>Images</h1>
            {followedArr.map(im => (
                <div
                    key={im.id}
                    style={{
                        backgroundImage: `url(${im.image})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        width: "50%",
                        height: 250,
                        margin: 10,
                        // width: "auto",
                    }} />
            ))}
        </div>
        // <div>All Posts Page</div>
    )
}

export default ViewAllPosts;
