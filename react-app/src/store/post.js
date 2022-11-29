// ------------------- Action types ------------------- //
const GET_POSTS = 'posts/GET_POSTS';
const GET_ONE_POST = 'posts/GET_ONE_POST';
const ADD_POST = 'posts/ADD_POST';
const UPDATE_POST = 'posts/UPDATE_POST';
const DELETE_POST = 'posts/DELETE_POST';
const GET_USER_POST = 'posts/GET_USER_POST';


// ------------------- Action creators ------------------- //
const getPosts = posts => ({
    type:GET_POSTS,
    payload: posts
})

const getOnePost = post => ({
        type: GET_ONE_POST,
        payload: post
});

const addPost = post => ({
    type: ADD_POST,
    payload: post
})

const updatePost = post => ({
    type: UPDATE_POST,
    payload: post
})

const deletePost = post => ({
    type: DELETE_POST,
    payload: post
})

const getUserPost = post => ({
    type: GET_USER_POST,
    payload: post
})


// ------------------- Thunk creators ------------------- //
export const getAllPosts = (id) => async dispatch => {
    const response = await fetch (`/api/posts/photofeed/${id}`)
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        };

        dispatch(getPosts(data));
        return data;
    }
}

export const getSinglePost = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`);

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        };

        dispatch(getOnePost(data));
        return data;
    }
};

export const addOnePost = (form) => async dispatch => {
    const response = await fetch(`/api/posts/create`, {
        method: 'POST',
        body: form
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(addPost(data));
        return data;
    }
}

export const updateOnePost = post => async dispatch => {
    const response = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(updatePost(data));
        return data;
    }
}

export const deleteOnePost = postId => async dispatch => {
    const res = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
    })
    if (res.ok) {
        dispatch(deletePost(postId))
        return 'Post successfully deleted.'
    }
}

export const getUserPosts = userId => async dispatch => {
    const res = await fetch(`/api/posts/user/${userId}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(getUserPost(data))
        return data
    }
}


// ------------------- Initial state ------------------- //
const initialState = {};




// ------------------- Reducer ------------------- //
export default function postsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_POSTS: {
            newState = { ...state };
            for (const key in action.payload) {
                newState[action.payload[key].id] = action.payload[key]
            }
            return newState;
        };
        case GET_ONE_POST: {
            newState = {
                ...state,
                [action.payload.post.id]: action.payload.post
            };
            return newState;
        };
        case ADD_POST: {
            newState = {
                ...state,
                [action.payload.post.id]: action.payload.post
            };
            return newState;
        };
        case UPDATE_POST: {
            newState = {
                ...state,
                [action.payload.post.id]: action.payload.post
            };
            return newState;
        };
        case DELETE_POST: {
            newState = { ...state };
            delete newState[action.payload.id];
            return newState;
        };
        case GET_USER_POST:
            newState = {
                ...state,
                userpost: action.payload
            }
            return newState

        default:
            return state;
    };
};
