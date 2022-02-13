import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import CommentDetails from "./CommentDetails";
import CreateComment from "./CreateComment";
import { likePost, unlikePost } from "../../../store/likes";
import { deleteOnePost } from "../../../store/post"
import '../ViewPosts/ViewPosts.css';
import './ViewSinglePost.css';



const ViewSinglePost = ({ post, setUpdate1, setShowModal }) => {
    const history = useHistory()
    const dispatch = useDispatch();
    const userId = useSelector(state => {
        if (state.session.user) {
            return state.session.user.id
        }
    });

    const [update, setUpdate] = useState(false);
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([])
    const [userprof, setUserProf] = useState([])
    const [editPost, setEditPost] = useState(false)
    const [newCaption, setNewCaption] = useState(post.caption)


    useEffect(async () => {
        const res_likes = await fetch(`/api/likes/p/${post.id}/likes`);
        const res = await fetch(`/api/comments/posts/${post.id}/comments`)
        const res_user = await fetch(`/api/users/${post.user_id}`)

        const like = await res_likes.json()
        const data = await res.json()
        const userpage = await res_user.json()


        setComments(data)
        setLikes(like)
        setUserProf(userpage)
        setUpdate(false)
    }, [update])

    const handleLike = async () => {
        dispatch(likePost(userId, post.id))
        setUpdate(true);
    };

    const handleUnlike = async () => {
        dispatch(unlikePost(userId, post.id))
        setUpdate(true)
    }

    const handleDelete = async () => {
        dispatch(deleteOnePost(post.id))
        setShowModal(false)
        window.location.reload(false)
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        setEditPost(true)
    }

    const handleCaptionSubmit = async (e) => {
        e.preventDefault()
        const form = {caption: newCaption}
        const res = await fetch(`/api/posts/${post.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(form)
        })
        setEditPost(false)
        setUpdate1(true)
    }

    const handleEditCancel = async (e) => {
        e.preventDefault()
        setEditPost(false)
    }

    let field;
    let owned = false;

    if (userId === post.user_id) owned = true;

    if (owned) {
        field = <div>
            {post.caption}
            <button id='edit-comment' onClick={handleEdit}><i className="far fa-edit"></i></button>
        </div>
    } else {
        field = <div>
            {post.caption}
        </div>
    }

    if (editPost) {
        field = <form className="confirm-edit-caption-form" onSubmit={handleCaptionSubmit}>
        <textarea
            className="confirm-edit-caption-input"
            rows="10"
            type="text"
            value={newCaption}
            onChange={(e) => setNewCaption(e.target.value)}
        />
        <button id='submit-edit-comment' type="submit"><i className="far fa-check-circle"></i></button>
        <button id='cancel-edit-comment' onClick={handleEditCancel}><i className="far fa-times-circle"></i></button>
    </form>
    }

    let like;

    if (likes[userId]) {
        like = <i id='heart-like' className="fas fa-heart" style={{ "color": "#e94943" }} onClick={() => handleUnlike()}></i>
    } else {
        like = <i id='heart-like' className="far fa-heart" onClick={() => handleLike()}></i>
    }

    return (
        <div className='single-container' key={post.id}>
            <div className='single-image'
                style={{
                    backgroundImage: `url(${post.image})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                }}></div>
            <span className='single-span'>
                <div id='single-header'>
                    <NavLink to={`/profile/${post.user_id}`} id='single-username'>
                        {userprof.username}
                    </NavLink>
                    {post.user_id === userId && (
                        <button id="deleteBtn" onClick={() => handleDelete()}><i className="fas fa-trash-alt"></i></button>
                    )}
                </div>
                <div id='single-caption-comments'>
                    <div><b>{userprof.username}</b>{field}</div>
                    {comments?.comments?.map(comment => (
                        <CommentDetails comment={comment} key={comment.id} setUpdate={setUpdate} />
                    ))}
                </div>
                <div className='single-likes'>
                    {like}
                    <div>{Object.keys(likes).length} likes</div>
                </div>
                <CreateComment post={post} setUpdate={setUpdate} />
            </span>
        </div>
    )
}

export default ViewSinglePost;
