import axios from 'axios';

import { ADD_POST, GET_POSTS, GET_ERRORS, POST_LOADING, DELETE_POST } from './types';

// add post
export const addPost = postData => dispatch => {
  // dispatch(clearErrors());
  axios
    .post('/api/posts', postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Get Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get('/api/posts')
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};
//delete post 
export const deletePost = id => dispatch => {
  // dispatch(clearErrors());
  axios
    .post(`/api/post/${id}`, postData)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
////////////////////////////////////////////////////////////////
// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
