import axios from 'axios';

const DATA_URL = `https://jsonplaceholder.typicode.com/users`;

export const GETTING_USERS = 'GETTING_USERS';
export const GET_USERS_ERROR = 'GET_USERS_ERROR';
export const USERS_SUCCESS = 'USERS_SUCCESS';
export const MAKING_USER = 'MAKING_USER';
export const MAKE_USER_ERROR = 'MAKE_USER_ERROR';
export const MAKE_USER_SUCCESS = 'MAKE_USER_SUCCESS';

//get all users
export const getAllUsers = () => {
  return dispatch => {
    dispatch({ type: GETTING_USERS });
    axios.get(DATA_URL)
      .then((res) => {
        dispatch({ type: USERS_SUCCESS, users: res.data})
      })
      .catch((err) => {
        console.log('error', err);
        dispatch({ type: GET_USERS_ERROR })
      })
  }
}


//create new user- doesn't update data source
export const makeUser = (userData) => {
  return dispatch => {
    dispatch({ type: MAKING_USER })
    // get user list
    // add new user to list
    //return list
    axios.post(DATA_URL)
      .then((res) => {
        console.log('res', res);
        dispatch({ type: MAKE_USER_SUCCESS, new_user: res.data})
      })
      .catch((err) => {
        console.log('error', err);
        dispatch({ type: MAKE_USER_ERROR })
      })
  }
}