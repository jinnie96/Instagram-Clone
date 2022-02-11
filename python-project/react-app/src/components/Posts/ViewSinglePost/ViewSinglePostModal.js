import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import '../ViewPosts/ViewPosts.css';
import CommentDetails from "./CommentDetails";
import CreateComment from "./CreateComment";
import './ViewSinglePost.css';
import { likePost, unlikePost } from "../../../store/likes";
import { getAllPosts } from "../../../store/post";
import { BsHeartFill, BsHeart } from "react-icons/bs";



const ViewSinglePost = ({ post, comments }) => {
    console.log("Post and Comment", post, comments);
    const dispatch = useDispatch()
    const history = useHistory()
    const userId = useSelector(state => {
        if (state.session.user) {
            return state.session.user.id
        }
    })

    const [update, setUpdate] = useState(false);
    const [likes, setLikes] = useState([]);


    useEffect(async () => {
        const res_likes = await fetch(`/api/likes/p/${post.id}/likes`);
        const like = await res_likes.json()
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
    // const allLikeToThisPost = useSelector(state => {
    //     if (state.likes) {
    //         return Object.values(state.likes)
    //             .filter(like => like?.post_id === +post.id)
    //     }
    // })
    // console.log(allLikeToThisPost)

    // const isLiked = allLikeToThisPost.filter(like => like.user_id === userId).length > 0 ? true : false

    // const handleLike = () => {
    //     isLiked ? dispatch(unlikePost(userId, post.id)) : dispatch(likePost(userId, post.id))
    // }

    let like;

    if(likes[userId]){
        like = <button id='unlike' onClick={() => handleUnlike()}>Unlike</button>
    } else {
        like =  <button id='like' onClick={() => handleLike()}>Like</button>

    }
    return (
        <div className='single-post-container' key={post.id}>
            <div className='post-image'
                style={{
                    backgroundImage: `url(${post.image})`,
                    backgroundSize: "cover",
                    // backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                }}></div>
            <div className='post-caption'>
                <div className='post-username'>{post.username}</div>
                <div className='caption-username'>{post.username}</div>
                <div className='caption-caption'>{post.caption}</div>
                {like}
            </div>
            <div>
                {comments.comments.map(comment => (
                    <CommentDetails comment={comment} key={comment.id} />
                ))}
                <CreateComment post={post} />
            </div>
        </div>
    )
}

export default ViewSinglePost;
