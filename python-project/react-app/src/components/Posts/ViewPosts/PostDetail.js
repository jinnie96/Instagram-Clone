import React, { useState, useEffect } from "react";
import { getAllPosts } from "../../../store/post";
import { getAllComments } from "../../../store/comments";
import { NavLink } from "react-router-dom";
import { Modal } from '../../../context/Modal';
import ViewSinglePost from "../ViewSinglePost/ViewSinglePostModal";
import { useDispatch, useSelector } from 'react-redux';
import './PostDetail.css';

const PostDetail = ({ post }) => {
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    console.log("POST DETAILS", post);

    useEffect(async () => {
        dispatch(getAllPosts(user.id))
    }, [dispatch])

    return (
        <>
            <div className='post-detail-container'>
                <div className='post-username'>
                    <NavLink to={`/profile/${post.user_id}`}>
                        {post.username}
                    </NavLink>
                </div>
                <div className='post-image'
                    style={{
                        backgroundImage: `url(${post.image})`,
                        backgroundSize: "cover",
                        // backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    }}></div>
                <div className='post-caption' onClick={() => setShowModal(true)}>
                    <p><b>{post.username}</b> {post.caption}</p>
                </div>
            </div>
            <div>
                {(showModal) && (
                    <Modal onClose={() => setShowModal(false)}>
                        <ViewSinglePost post={post} />
                    </Modal>
                )}
            </div>
        </>
    )
}

export default PostDetail;
