import React, { useState, useEffect } from "react";
import { getAllPosts } from "../../store/post";
import { Modal } from '../../context/Modal';
import ViewSinglePost from "../Posts/ViewSinglePost/ViewSinglePostModal";
import { useDispatch, useSelector } from 'react-redux';
import './ProfilePostDetail.css';

const ProfilePostDetail = ({ post }) => {
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch()
    const [comments, setComments] = useState([])

    const user = useSelector(state => state.session.user)
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
            <div className='profile-grid-image' onClick={() => setShowModal(true)}
                style={{
                    backgroundImage: `url(${post.image})`,
                    backgroundSize: "cover",
                    // backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                }}>
            </div>
            {(showModal) && (
                <Modal onClose={() => setShowModal(false)}>
                    <ViewSinglePost post={post} comments={comments} />
                </Modal>
            )}
        </>
    )
}

export default ProfilePostDetail;
