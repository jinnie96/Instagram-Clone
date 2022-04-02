const SEARCH_USERS = "search/SEARCH_USERS"

const searchUsers = term => ({
    type: SEARCH_USERS,
    payload: term
  });

  export const searchTerm = (term)  => async(dispatch) => {
      console.log(term)
    const response = await fetch('/api/users/search', {
        method:'PUT',
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(term)
    })
    if (response.ok) {
        const data = await response.json();
        // print(data)
        // dispatch(updatePost(data));
        return data;
    }

  }
