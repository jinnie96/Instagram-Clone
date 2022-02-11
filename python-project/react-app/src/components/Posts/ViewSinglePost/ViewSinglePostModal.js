import React from "react";
import { useDispatch } from 'react-redux';
import '../ViewPosts/ViewPosts.css';
import CommentDetails from "./CommentDetails";
import CreateComment from "./CreateComment";
import './ViewSinglePost.css';


const ViewSinglePost = ({ post, comments }) => {
    console.log("Post and Comment", post, comments);
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
                    <div id='home-single-username'>{post.username}</div>
                    <div id='home-single-caption'>
                        <p><b>{post.username}</b> {post.caption}</p>
                    </div>
                </div>
                <div className='home-single-comments'>
                    {comments.comments.map(comment => (
                        <CommentDetails comment={comment} key={comment.id}/>
                    ))}
                </div>
                <div className='home-single-create'>
                    <button>Like</button>
                    <CreateComment post={post} />
                </div>
            </span>
        </div>
    )
}

export default ViewSinglePost;
