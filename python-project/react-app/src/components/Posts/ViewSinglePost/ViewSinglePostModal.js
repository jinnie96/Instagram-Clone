import React, { useEffect } from "react";
import { getAllPosts } from "../../../store/post";
import { useDispatch, useSelector } from 'react-redux';
import '../ViewPosts/ViewPosts.css';
import './ViewSinglePost.css';

const ViewSinglePost = ({ post }) => {
    const dispatch = useDispatch()
    // const user = useSelector(state => state.session.user)

    // useEffect(() => {
    //     dispatch(getAllPosts(user.id))
    // }, [dispatch])

    return (
        <div className='single-post-container' key={post.id}>
            <div className='post-username'>{post.username}</div>
            <div className='post-image'
                style={{
                    backgroundImage: `url(${post.image})`,
                    backgroundSize: "cover",
                    // backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                }}></div>
            <div className='post-caption'>
                <div className='caption-username'>{post.username}</div>
                <div className='caption-caption'>{post.caption}</div>
            </div>
        </div>
    )
}

export default ViewSinglePost;
