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
    console.log(response)
    if (response.ok) {
        const data = await response.json();
        console.log(data, "DAAAAATAAA")
        // print(data)
        // dispatch(updatePost(data));
        return data;
    }

  }

  export const searchHashtag = (term)  => async(dispatch) => {
    console.log("TTTTTT", term)
  const response = await fetch('/api/users/hashtag', {
      method:'PUT',
      headers: {
          "Content-Type": "application/json",
        },
      body: JSON.stringify(term)
  })
  console.log(response)
  if (response.ok) {
      const data = await response.json();
      console.log(data, "DAAAAATAAA")
      // print(data)
      // dispatch(updatePost(data));
      return data;
  }

}
