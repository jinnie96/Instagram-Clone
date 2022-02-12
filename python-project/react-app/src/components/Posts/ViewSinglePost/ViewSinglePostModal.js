
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
    console.log("-------------profile post", post);


    let like;

    if(likes[userId]) {
        like =  <i id='heart-like' className="fas fa-heart" style={{"color": "#e94943"}} onClick={() => handleUnlike()}></i>
    } else {
        like =  <i id='heart-like' className="far fa-heart" onClick={() => handleLike()}></i>
    }

    return (
        <div className='single-container' key={post.id}>
            <div className='single-image'
                style={{
                    backgroundImage: `url(${post.image})`,
                    backgroundSize: "cover",
                    // backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                }}></div>
            <span className='single-span'>
                <NavLink to={`/profile/${post.user_id}`} id='single-username'>
                        {userprof.username}
                </NavLink>
                <div id='single-caption-comments'>
                    <p><b>{userprof.username}</b> {post.caption}</p>
                    {comments?.comments?.map(comment => (
                        <CommentDetails comment={comment} key={comment.id} setUpdate={setUpdate}/>
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
