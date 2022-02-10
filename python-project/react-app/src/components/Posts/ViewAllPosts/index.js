import React, { useState, useEffect } from "react";
import { getAllPosts, getFollowPosts } from "../../../store/post";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";


const ViewAllPosts = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    // console.log("UserSTATE@@@@@", user)

    const allPosts = useSelector(state => state.post)
    // console.log("ALLLLL POST@@@@@@", allPosts)

    useEffect(() => {
        // console.log("USEEFFECTTTTTTT")
        dispatch(getAllPosts())
    }, [dispatch])

    const allPostsArr = Object.values(allPosts)
    const allPostsArrReverse = allPostsArr.reverse()
    // console.log(allPostsArr)

    // allPostsArr.map(post => console.log(post.image, post.id))


    return (
        <div style={{
            display:"flex",
            flexDirection: "column",
            width: "100vw",
            alignItems: "center"
            }}>
            <h1>Images</h1>
            {allPostsArrReverse.map(post => (
                <div
                    key={post.id}
                    style={{
                        backgroundImage: `url(${post.image})`,
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
