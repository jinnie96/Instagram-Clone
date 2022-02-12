// import React from "react";
// import { useDispatch } from 'react-redux';
// import { NavLink } from 'react-router-dom'
// import '../ViewPosts/ViewPosts.css';
// import CommentDetails from "./CommentDetails";
// import CreateComment from "./CreateComment";
// import './ViewSingleProfilePost.css';

// const ViewSingleProfilePost = ({ post, comments }) => {
//     console.log("Post and Comment", post, comments);
//     return (

//         <div className='single-post-container' key={post.id}>
//             <div className='post-image'
//                 style={{
//                     backgroundImage: `url(${post.image})`,
//                     backgroundSize: "cover",
//                     // backgroundSize: "contain",
//                     backgroundRepeat: "no-repeat",
//                     backgroundPosition: "center"
//                 }}>
//             </div>

//             <div className="post-details">
//                 <div className='post-caption'>
//                     <div className='post-username'>
//                         <NavLink to={`/profile/${post.user_id}`}>
//                             {post.username}
//                         </NavLink>
//                     </div>
//                     <div className='caption-username'>{post.username}</div>
//                     <div className='caption-caption'>{post.caption}</div>
//                 </div>
//                 <div>
//                     {comments?.comments?.map(comment => (
//                         <CommentDetails comment={comment} key={comment.id} />
//                     ))}
//                     <button>Like</button>
//                     <CreateComment post={post} />
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default ViewSingleProfilePost;
