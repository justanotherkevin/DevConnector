import { GET_ERRORS, SET_CURRENT_USER } from './types';
import axios from 'axios';
// due to nature of api request being async... you use the thunk middleware
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
// REGISTER USER
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Login - get uer token
// this is going to set the token into localstorage, then user the token in localstorage to call into private routes
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      console.log(res);
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      // token need to be decoded before use
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
// set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// log user out
export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  //remove auth header from future request
  setAuthToken(false);
  // set current user to null which will set isAuthenticated to false
  dispatch(setCurrentUser(null));
};
