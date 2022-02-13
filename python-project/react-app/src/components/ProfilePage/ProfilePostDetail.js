import React, { useState, useEffect } from "react";
import { getAllPosts } from "../../store/post";
import { Modal } from '../../context/Modal';
import ViewSinglePost from "../Posts/ViewSinglePost/ViewSinglePostModal";
import { useDispatch, useSelector } from 'react-redux';
import './ProfilePostDetail.css';

const ProfilePostDetail = ({ post, setUpdate }) => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()
    console.log(post);
    const user = useSelector(state => state.session.user)
    useEffect(async () => {
        dispatch(getAllPosts(user.id))
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
                    <ViewSinglePost post={post} setUpdate1={setUpdate} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}

export default ProfilePostDetail;
