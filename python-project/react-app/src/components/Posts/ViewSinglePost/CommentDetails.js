import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as userActions from '../../../store/users'


const CommentDetails = ({ comment }) => {
    const [user, setUser] = useState([])
    const current = useSelector(state => state.session.user)

    useEffect(async () => {
        const res = await fetch(`/api/users/${comment.user_id}`)
        if (res.ok) {
            const data = await res.json()
            setUser(data)
        }

    }, [])

    if (current.id === user.id) {
        return (
            <>
                <div>
                    <p>{user.username}</p>
                    <p>{comment.comment} <button>Edit</button></p>
                </div>
            </>
        )
    }
    return (
        <>
            <div>
                <p>{user.username}</p>
                <p>{comment.comment}</p>
            </div>
        </>
    )
}

export default CommentDetails
