import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as userActions from '../../../store/users'


const CommentDetails = ({ comment, setUpdate }) => {
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
        const res = await fetch(`/api/comments/${comment.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                comment: newComment,
                edited: true
            })
        })
        setUpdate(true)
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

    const handleDelete = async (e) => {
        e.preventDefault()
        const res = await fetch(`/api/comments/${comment.id}`, {
            method: "DELETE"
        })
        setUpdate(true)
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
        <button type="submit">Submit</button>
        <button onClick={handleCancel}>Cancel</button>
    </form>
    } else {
        field = <p className="comment-field">
            {comment.comment}
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </p>
    }

    if (current.id === user.id) {
        return (
            <>
                <div>
                        <b>{user.username}</b>
                        {field}
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