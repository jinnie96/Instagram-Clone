import React, { useState, useEffect } from "react";
import { getAllPosts } from "../../../store/post";
import { Modal } from '../../../context/Modal';
import ViewSinglePost from "../ViewSinglePost/ViewSinglePostModal";
import { useDispatch, useSelector } from 'react-redux';
import './PostDetail.css';

const PostDetail = ({ post }) => {
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getAllPosts(user.id))
    }, [dispatch])

    return (
        <>
            <div className='post-detail-container'>
                <div className='post-username'>{post.username}</div>
                <div className='post-image'
                    style={{
                        backgroundImage: `url(${post.image})`,
                        backgroundSize: "cover",
                        // backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    }}></div>
                <div className='post-caption' onClick={() => setShowModal(true)}>
                    <div className='caption-username'>{post.username}</div>
                    <div className='caption-caption'>{post.caption}</div>
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
