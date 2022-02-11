import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as userActions from '../../../store/users'


const CommentDetails = ({ comment }) => {
    const [user, setUser] = useState([])
    const current = useSelector(state => state.session.user)
    const [newComment, setNewComment] = useState(comment.comment)
    const [edit, setEdit] = useState(false)
    useEffect(async () => {
        const res = await fetch(`/api/users/${comment.user_id}`)
        if (res.ok) {
            const data = await res.json()
            setUser(data)
        }

    }, [])

    const handleEditSubmit = async (e) => {
        e.preventDefault()
        setEdit(false)
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        setEdit(true)
    }

    const handleCancel = async (e) => {
        e.preventDefault()
        setNewComment(comment.comment)
        setEdit(false)
    }

    let field;

    if (edit) {
        field = <form className="edit-comment-form" onSubmit={handleEditSubmit}>
        <input
        className="edit-comment-input"
        type="text"
        contentEditable="false"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Post</button>
        <button onClick={handleCancel}>Cancel</button>
    </form>
    } else {
        field = <p className="comment-field">{comment.comment}
        <button onClick={handleEdit}>Edit</button></p>
    }

    if (current.id === user.id) {
        return (
            <>
                <div>
                    <p>
                        <b>{user.username}</b>
                        {field}
                    </p>
                </div>
            </>
        )
    }
    return (
        <>
            <div>
                <p><b>{user.username}</b> {comment.comment}</p>
            </div>
        </>
    )
}

export default CommentDetails
