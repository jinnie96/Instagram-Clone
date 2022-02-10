import React, { useEffect } from "react";
import { getAllPosts } from "../../../store/post";
import { useDispatch, useSelector } from 'react-redux';
import './ViewAllPosts.css';


const ViewAllPosts = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    // console.log("UserSTATE@@@@@", user)

    const allPosts = useSelector(state => state.post)
    // console.log("ALLLLL POST@@@@@@", allPosts)

    useEffect(() => {
        // console.log("USEEFFECTTTTTTT")
        dispatch(getFollowPosts(user.id))
    }, [dispatch])

    const allPostsArr = Object.values(allPosts)
    const allPostsArrReverse = allPostsArr.reverse()
    // console.log(allPostsArr)

    // allPostsArr.map(post => console.log(post.image, post.id))





    {/* {allPostsArrReverse.map(post => {
        return <div key={post.id}>
            <div>{post.user_id}</div>
            <img src={post.image}/>
            <div>{post.caption}</div>
        </div>
    })} */}

    return (
        <div className='all-post-container'>
            {/* <h1>Images</h1> */}
            {allPostsArrReverse.map(post => (
                <div className='post-container'>
                    <div id='post-id'>User id: {post.user_id}</div>
                    <div id='post-image'
                        key={post.id}
                        style={{
                            backgroundImage: `url(${post.image})`,
                            backgroundSize: "cover",
                            // backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center"
                        }}></div>
                    <div id='post-caption'>{post.user_id} {post.caption}</div>
                </div>
            ))}
        </div>
    )
}

export default ViewAllPosts;
