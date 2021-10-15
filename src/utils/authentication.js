

export const getAuthHeaders = (headers = {}) => {
  // return authorization header with token
  try {
    const currentUser = JSON.parse(localStorage.getItem('current-user'));

    if(currentUser && currentUser.token) {
      return {
        ...headers,
        'x-access-token': currentUser.accessToken
      }
    }
  
    return {
      ...headers
    }
  }
  catch (error) {
    console.log('error getting current user:', error)
    return { ...headers }
  }
}

export const logoutUser = () => {
  try {
    localStorage.removeItem("current-user");
  }
  catch (error) {
    console.log('error removing user:', error)
  }
}

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("current-user"));
  }
  catch (error) {
    console.log('error getting current user:', error)
    return null;
  }
};