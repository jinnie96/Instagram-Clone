import React, { useEffect } from "react";
import { getAllPosts } from "../../../store/post";
import PostDetail from "./PostDetail";
import { useDispatch, useSelector } from 'react-redux';
import './ViewPosts.css'

const ViewPosts = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const viewPosts = useSelector(state => state.post)

    useEffect(() => {
        dispatch(getAllPosts(user.id))
    }, [dispatch])

    const viewPostsArr = Object.values(viewPosts)
    const viewPostsArrReverse = viewPostsArr.reverse()


    return (
        <div className='all-post-container'>
            <div className='post-welcome-container'>
                <h1>Welcome, {user.username}</h1>
            </div>
            {viewPostsArrReverse.map(post => (
                <PostDetail post={post} />
            ))}
        </div>
    )
}

export default ViewPosts;
