import React, { useState, useEffect } from "react";
import { getAllPosts } from "../../../store/post";
import { getAllComments } from "../../../store/comments";
import { NavLink } from "react-router-dom";
import { Modal } from '../../../context/Modal';
import ViewSinglePost from "../ViewSinglePost/ViewSinglePostModal";
import { useDispatch, useSelector } from 'react-redux';
import { likePost, unlikePost } from "../../../store/likes";
import './PostDetail.css';

const PostDetail = ({ post }) => {
    const [showModal, setShowModal] = useState(false);
    const [likes, setLikes] = useState([]);
    const [update, setUpdate] = useState(false);
    const [update1, setUpdate1] = useState(false)


    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    console.log("POST DETAILS", post);

    useEffect(async () => {
        dispatch(getAllPosts(user.id))

        const res_likes = await fetch(`/api/likes/p/${post.id}/likes`);
        const like = await res_likes.json()

        setLikes(like)
        setUpdate(false)
        setUpdate1(false)
    }, [dispatch, update, showModal, update1])

    const handleLike = async () => {
        dispatch(likePost(user.id, post.id))
        setUpdate(true)
    }

    const handleUnlike = async () => {
        dispatch(unlikePost(user.id, post.id))
        setUpdate(true)
    }

    let like;

    if(likes[user.id]) {
        like =  <i id='post-heart-like' className="fas fa-heart" style={{"color": "#e94943"}} onClick={() => handleUnlike()}></i>
    } else {
        like =  <i id='post-heart-like' className="far fa-heart" onClick={() => handleLike()}></i>
    }

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
                <div className='post-likes'>
                    {like}
                    <div>{Object.keys(likes).length} likes</div>
                </div>
                <div className='post-caption' onClick={() => setShowModal(true)}>
                    <p><b>{post.username}</b> {post.caption}</p>
                </div>
            </div>
            <div>
                {(showModal) && (
                    <Modal onClose={() => setShowModal(false)}>
                        <ViewSinglePost post={post} setUpdate1={setUpdate1} setShowModal={setShowModal} />
                    </Modal>
                )}
            </div>
        </>
    )
}

export default PostDetail;
