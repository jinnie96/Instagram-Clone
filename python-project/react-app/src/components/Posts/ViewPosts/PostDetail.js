import React, { useState, useEffect } from "react";
import { getAllPosts } from "../../../store/post";
import { getAllComments } from "../../../store/comments";
import { Modal } from '../../../context/Modal';
import ViewSinglePost from "../ViewSinglePost/ViewSinglePostModal";
import { useDispatch, useSelector } from 'react-redux';
import './PostDetail.css';

const PostDetail = ({ post }) => {
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [comments, setComments] = useState([])
    console.log("POST DETAILS", post);
    useEffect(async () => {
        dispatch(getAllPosts(user.id))
        const res = await fetch(`/api/comments/posts/${post.id}/comments`)
        if (res.ok) {
            const data = await res.json()
            setComments(data)
        }
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
                    <p><b>{post.username}</b> {post.caption}</p>
                </div>
            </div>
            <div>
                {(showModal) && (
                    <Modal onClose={() => setShowModal(false)}>
                        <ViewSinglePost post={post} comments={comments}/>
                    </Modal>
                )}
            </div>
        </>
    )
}

export default PostDetail;
