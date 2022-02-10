const GET_FOLLOWERS = 'follows/GET_FOLLOWERS'
const ADD_FOLLOW = 'follows/ADD_FOLLOW'
const REMOVE_FOLLOW = 'follows/REMOVE_FOLLOW'

const getFollowers = followers => ({
  type: GET_FOLLOWERS,
  payload: followers
})

const addFollow = follow => ({
  type: ADD_FOLLOW,
  payload: follow
})

const removeFollow = follow => ({
  type: REMOVE_FOLLOW,
  payload: follow
})


export const getAllFollowers = (id) => async dispatch => {
  const res = await fetch(`/api/follow/${id}/followers`)
  if (res.ok) {
    const data = await res.json();
    if (data.errors) {
      return;
    }
    dispatch(getFollowers(data));
    return data
  }
}

export const followUser = (followerId, followedId) => async (dispatch) => {
  const res = await fetch(`/api/follow/${followerId}/following/${followedId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ followerId, followedId }),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addFollow(data));
    if (data.errors) {
      return;
    }
    return data
  }
};

export const unfollowUser = (followerId, followedId) => async (dispatch) => {
  const res = await fetch(`/api/follow/${followerId}/followers/${followedId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ followerId, followedId }),
  });

  if (res.ok) {
    const data = await res.json();
    if (data.errors) {
      return;
    }
    dispatch(removeFollow(data));
    return data
  }
};

const initialState = {};


// ------------------- Reducer ------------------- //

export default function followerReducer(state = initialState, action) {
  let newState;
  switch (action.type) {

    case GET_FOLLOWERS:
      newState = { ...state }
      newState.follow = { ...action.payload }
      return newState;

    case ADD_FOLLOW:
      newState = { ...state }
      newState.following = action.payload
      return newState;

    case REMOVE_FOLLOW:
      return { ...state }

    default:
      return state;
  }
}
