import React, { useState, useEffect } from "react";
import { getFollowPosts } from "../../../store/post";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import './index.css'

const ViewFollowedPosts = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const followedPosts = useSelector(state => state.post)

    useEffect(() => {
        dispatch(getFollowPosts(user.id))
    }, [dispatch])

    const followedPostsArr = Object.values(followedPosts)
    const followedPostsArrRev = followedPostsArr.reverse()


    return (
        <div style={{
            display:"flex",
            flexDirection: "column",
            width: "100vw",
            alignItems: "center"
            }}>
            <h1>Images</h1>
            {followedPostsArrRev.map(post => (
                <div
                    id="feedPost"
                    key={post.id}
                    style={{
                        backgroundImage: `url(${post.image})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        // width: "50%",
                        // height: 250,
                        margin: 10,
                        // width: "auto",
                    }} />
            ))}
        </div>
        // <div>All Posts Page</div>
    )
}

export default ViewFollowedPosts;
