import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addOneComment } from "../../../store/comments";
import './comment.css'

const NewCommentForm = ({ post }) => {
    const [errors, setErrors] = useState([]);
    const [comment, setComment] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const updateComment = e => {
        setComment(e.target.value)
    }

    const submit = async e => {
        e.preventDefault()
        setErrors([]);

        const newComment = {
            user_id: user.id,
            post_id: post.id,
            comment
        }

        let submitted = await dispatch(addOneComment(newComment))
            .catch(async res => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })

        if (submitted) {
            setComment('')
        }
    }

    return (
        <form className="new-comment-form" onSubmit={submit} >
            <div>
                <ul className="errors">
                    {errors.map((error, ind) => (
                        <li key={ind}>{error}</li>
                    ))}
                </ul>
                <div className="new-comment-box">
                    <input
                        className="new-comment-input"
                        name='comment'
                        type='text'
                        placeholder="Comment..."
                        value={comment}
                        onChange={updateComment}
                    />
                    <button className="submit-new-comment" type='submit'>Post</button>
                </div>
            </div>
        </form>
    )
}

export default NewCommentForm
