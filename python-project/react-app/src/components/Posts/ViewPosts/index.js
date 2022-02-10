import React, { useEffect } from "react";
import { getAllPosts } from "../../../store/post";
import { useDispatch, useSelector } from 'react-redux';
import './ViewPosts.css'

const ViewPosts = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    // console.log("UserSTATE@@@@@", user)

    const viewPosts = useSelector(state => state.post)
    // console.log("ALLLLL POST@@@@@@", allPosts)

    useEffect(() => {
        // console.log("USEEFFECTTTTTTT")
        dispatch(getAllPosts(user.id))
    }, [dispatch])

    const viewPostsArr = Object.values(viewPosts)
    const viewPostsArrReverse = viewPostsArr.reverse()
    // console.log("REVERSE@@@@@", viewPostsArrReverse)
    // console.log(allPostsArr)

    // allPostsArr.map(post => console.log(post.image, post.id))


    return (
        <div className='all-post-container'>
            <div className='post-welcome-container'>
                <h1>Welcome, {user.username}</h1>
            </div>
            {viewPostsArrReverse.map(post => (
                <div className='post-container'>
                    <div id='post-id'>User id: {post.user_id}</div>
                    <div id='post-image'
                        key={post.id}
                        style={{
                            backgroundImage: `url(${post.image})`,
                            backgroundSize: "cover",
                            // backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center"
                        }}></div>
                    <div id='post-caption'>{post.user_id} {post.caption}</div>
                </div>
            ))}
        </div>
    )
}

export default ViewPosts;
