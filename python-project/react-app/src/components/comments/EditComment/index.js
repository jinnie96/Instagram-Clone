import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { updateOneComment } from "../../../store/comments";
import './EditComment.css'

const EditCommentForm = ({comment, editState, sendDataToParent}) => {
    const postId = useParams().id
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [editPopUp, setEditPopUp] = useState(editState)
    const [comment, setComment] = useState('');
    const oldComment = useSelector(state => state?.comments[comment.id].comment)
    const userId = useSelector(state => {
        if (state.session.user) {
            return state.session.user.id
        }})

    useEffect(() => {
        setComment(oldComment)
    }, [])

    const updateComment = e => {
        setComment(e.target.value)
    }

    const onEdit = async e => {
        e.preventDefault()
        setErrors([]);

        const editComment = {
            id: +comment.id,
            user_id: userId,
            post_id: postId,
            comment
        }

        let submitted = await dispatch(updateOneComment(editComment))
        .catch(async res => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        })
        if (submitted) {
            setEditPopUp(!editPopUp)
            sendDataToParent(!editPopUp)
        }
    }

    return (
        <>
        {editPopUp && (
            <form className='edit-your-comment' onSubmit={onEdit}>
                <div>
                    <ul className="errors">
                        {errors.map((error, ind) => (
                            <li key={ind}>{error}</li>
                        ))}
                    </ul>
                    <div>
                        <input
                            className="edit-comment-input"
                            name='comment'
                            type='text'
                            placeholder="comment..."
                            value={comment_text}
                            onChange={updateComment}
                        />
                    </div>
                    <button className="hidden-submit" type='submit'>Edit</button>
                </div>
            </form>
        )}
        </>
    )
}

export default EditCommentForm
