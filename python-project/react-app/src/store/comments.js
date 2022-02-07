const GET_COMMENTS = 'comments/GET_COMMENTS';
const ADD_COMMENT = 'comments/ADD_COMMENT';
const UPDATE_COMMENT = 'comments/UPDATE_COMMENT';
const DELETE_COMMENT = 'comments/DELETE_COMMENT';

const getComments = comments => ({
    type: GET_COMMENTS,
    payload: comments
})

const addComment = comment => ({
    type: ADD_COMMENT,
    payload: comment
})

const updateComment = comment => ({
    type: UPDATE_COMMENT,
    payload: comment
})

const deleteComment = comment => ({
    type: DELETE_COMMENT,
    payload: comment
})


export const getAllComments = postId => async dispatch => {
    const response = await fetch(`/api/posts/${postId}/comments`)
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(getComments(data));
        return data
    }
}

export const addOneComment = comment => async dispatch => {
    const response = await fetch(`/api/posts/${comment.post_id}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(addComment(data))
        return data
    }
}

export const updateOneComment = comment => async dispatch => {
    const response = await fetch(`/api/comments/${comment.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(updateComment(data))
        return data
    }
}
export const deleteOneComment = id => async dispatch => {
    const res = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
    })
    if (res.ok) {
        dispatch(deleteComment(id))
        return 'Successfully deleted.'
    }
}

const initialState = {};

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_COMMENTS:
            newState = {}
            action.payload.comments.map((comment) =>  newState[comment.id] = comment )
            return newState
        case ADD_COMMENT:
            newState = {
                ...state,
                [action.payload.id]: action.payload
            }
            return newState
        case UPDATE_COMMENT:
            state[action.payload.comment.id] = action.payload.comment;
            newState = { ...state };
            return newState
        case DELETE_COMMENT:
            newState = { ...state }
            delete newState[action.payload]
            return newState
        default:
            return state;
    }
}
