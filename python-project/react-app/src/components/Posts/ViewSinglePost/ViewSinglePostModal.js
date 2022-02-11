import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import '../ViewPosts/ViewPosts.css';
import CommentDetails from "./CommentDetails";
import CreateComment from "./CreateComment";
import './ViewSinglePost.css';
import { likePost, unlikePost } from "../../../store/likes";
import { getAllPosts } from "../../../store/post";





const ViewSinglePost = ({ post }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const userId = useSelector(state => {
        if (state.session.user) {
            return state.session.user.id
        }
    })

    const [update, setUpdate] = useState(false);
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([])


    useEffect(async () => {
        const res_likes = await fetch(`/api/likes/p/${post.id}/likes`);
        const res = await fetch(`/api/comments/posts/${post.id}/comments`)

        const like = await res_likes.json()
        const data = await res.json()

        setComments(data)
        setLikes(like)
        setUpdate(false)
    }, [update])

    const handleLike = async () => {
        dispatch(likePost(userId, post.id))
        setUpdate(true)
    }

    const handleUnlike = async () => {
        dispatch(unlikePost(userId, post.id))
        setUpdate(true)
    }
    console.log(likes)

    let like;

    if(likes[userId]) {
        like =  <i className="fas fa-heart" style={{"color": "red"}} onClick={() => handleUnlike()}></i>
    } else {
        like =  <i className="far fa-heart" onClick={() => handleLike()}></i>
    }

    return (
        <div className='home-single-container' key={post.id}>
            <div className='home-single-image'
                style={{
                    backgroundImage: `url(${post.image})`,
                    backgroundSize: "cover",
                    // backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                }}></div>
            <span className='home-single-span'>
                <div className='home-single-info'>
                    <div id='home-single-username'>
                        <NavLink to={`/profile/${post.user_id}`}>
                            {post.username}
                        </NavLink>
                    </div>
                    <div id='home-single-caption'>
                        <p><b>{post.username}</b> {post.caption}</p>
                    </div>
                </div>
                <div className='home-single-comments'>
                    {comments?.comments?.map(comment => (
                        <CommentDetails comment={comment} key={comment.id} setUpdate={setUpdate}/>
                        ))}
                </div>
                <div className='home-single-create'>
                    {like}
                    {/* <button id='single-post-heart'><i class="far fa-heart"></i></button> */}
                    <CreateComment post={post} setUpdate={setUpdate} />
                </div>
            </span>
        </div>
    )
}

export default ViewSinglePost;
