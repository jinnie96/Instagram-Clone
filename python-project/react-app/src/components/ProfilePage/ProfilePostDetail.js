import React, { useState, useEffect } from "react";
import { getAllPosts } from "../../store/post";
import { Modal } from '../../context/Modal';
import ViewSinglePost from "../Posts/ViewSinglePost/ViewSinglePostModal";
import { useDispatch, useSelector } from 'react-redux';
import './ProfilePostDetail.css';

const ProfilePostDetail = ({ post }) => {
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getAllPosts(user.id))
    }, [dispatch])

    return (
        <>
            <div className='profile-post-detail-container'>
                <div className='profile-post-image' onClick={() => setShowModal(true)}
                    style={{
                        backgroundImage: `url(${post.image})`,
                        backgroundSize: "cover",
                        // backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    }}></div>
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

export default ProfilePostDetail;
