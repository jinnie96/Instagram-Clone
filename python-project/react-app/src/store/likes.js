const ADD_LIKE = 'likes/ADD_LIKE'
const REMOVE_LIKE = 'likes/REMOVE_LIKE'
const GET_LIKES = 'likes/GET_LIKES'

// ACTIONS
const getLikes = likes => ({
  type: GET_LIKES,
  payload: likes
});

const removeLike = like => ({
  type: REMOVE_LIKE,
  payload: like
});

const addLike = like => ({
  type: ADD_LIKE,
  payload: like
});

// SELECTORS
export const getAllLikes = () => async dispatch => {
  const res = await fetch('/api/likes/')
  if (res.ok) {
    const data = await res.json();
    if (data.errors) {
      return;
    }
    dispatch(getLikes(data));
    return data
  }
}

export const likePost = (userId, postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}/likes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, postId }),
  });

  if (res.ok) {
    const data = await res.json();
    if (data.errors) {
      return;
    }
    dispatch(addLike(data));
    return data
  }
};

export const unlikePost = (userId, postId) => async (dispatch) => {
  if (postId) {
    const res = await fetch(`/api/posts/${postId}/likes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, postId }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.errors) {
        return;
      }
      dispatch(removeLike(data));
      return data
    }
  }
};


const initialState = {};

export default function (state = initialState, action) {
  let newState;
  switch (action.type) {

    case GET_LIKES:
      newState = { ...state }
      action.payload.likes.map((like) => { newState[like.id] = like })
      return newState

    case ADD_LIKE:
      newState = { ...state, [action.payload.id]: action.payload };
      return newState;

    case REMOVE_LIKE:
      newState = { ...state };
      delete newState[action.payload.id];
      return newState;

    default:
      return state;
  }
}
