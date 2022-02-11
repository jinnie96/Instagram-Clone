const GET_USER = 'user/GET_USER';
const UPDATE_USER = 'user/UPDATE_USER';

const getUser = (user) => ({
    type: GET_USER,
    payload: user
})

const updateUser = (user) => ({
    type: UPDATE_USER,
    payload: user
})


export const getUserProfile = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(getUser(data))
    }
}

export const updateUserProfile = (id, form) => async dispatch => {
    const {username, firstName, lastName, email, biography} = form
    const post = {
        user_id: id,
        username,
        first_name: firstName,
        last_name: lastName,
        email,
        biography
    }
    const res = await fetch(`/api/users/${id}/account/edit`, {
        method: "PUT",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(post)
    })
    console.log("TEST @@@@@@@@@@@@@@@@@@@@@", res);
    if (res.ok) {
        const data = await res.json()
        dispatch(updateUser(data))
        return null;
    } else if (res.status < 500) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
    } else {
        return ['An error occured. Please try again.']
    }
}

const initialState = {}
export default function reducer(state = initialState, action) {
    switch(action.type) {

        case GET_USER:
            return state = { ...state, users: action.payload }

        case UPDATE_USER:
            const index = state.users?.findIndex(user => user.id === action.payload.id)
            return {
                ...state,
                ...state.users = {
                    ...state.users?.slice(0, index),
                    ...action.payload,
                    ...state.users?.slice(index)
                }
            }

        default:
            return state
    }
}
