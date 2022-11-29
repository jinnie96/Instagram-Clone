const GET_FOLLOWS = 'follows/GET_FOLLOWS'

// ------------------- Action creators ------------------- //
const getFollows = follows => ({
    type: GET_FOLLOWS,
    payload: follows
})



// ------------------- Thunk creators ------------------- //
export const getAllFollows = (id) => async dispatch => {
    const res = await fetch(`/api/follow/${id}/following`)
    if (res.ok) {
      const data = await res.json();
      if (data.errors) {
        return;
      }
      dispatch(getFollows(data));
      return data
    }
  }

//REDUCER
const initialState = {};

export default function (state = initialState, action) {
    let newState;
    switch (action.type) {

      case GET_FOLLOWS:
        newState = { ...state }
        action.payload.follows.map((follow) => newState.follows[follow.id] = follow)
        return newState

      default:
        return state;
    }
  }
