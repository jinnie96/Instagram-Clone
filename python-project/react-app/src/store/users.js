const GET_USER = 'user/GET_USER';

const getUser = (user) => ({
    type: GET_USER,
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

const initialState = {}
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_USER:
            return state = { ...state, users: action.payload }
        default:
            return state
    }
}
