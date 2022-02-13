import React, { useEffect, useState } from "react";
import { getAllPosts } from "../../../store/post";
import PostDetail from "./PostDetail";
import { useDispatch, useSelector } from 'react-redux';
import Footer from "../../Footer";
import './ViewPosts.css';


const ViewPosts = () => {
    const user = useSelector(state => state.session.user);
    const viewPosts = useSelector(state => state.post);
    const [update2, setUpdate2] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPosts(user.id));
    }, [dispatch, update2])

    const viewPostsArr = Object.values(viewPosts);
    const viewPostsArrReverse = viewPostsArr.reverse();
    return (
        <div className='all-post-container'>
            <div className='post-welcome-container'>
                <h1>Welcome, {user.username}</h1>
            </div>
            {viewPostsArrReverse.map(post => (
                <PostDetail post={post} key={post.id} />
            ))}
            <Footer />
        </div>
    )
}

export default ViewPosts;
