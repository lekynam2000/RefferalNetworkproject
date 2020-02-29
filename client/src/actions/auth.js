import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from './types';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';
export const register = (
  { name, email, password },
  client = false
) => async dispatch => {
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };
  const body = JSON.stringify({ name, email, password });
  const append = client ? '/client' : '';
  try {
    const res = await axios.post(`/api/user${append}`, body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser(append));
  } catch (error) {
    const err = error.response.data.errors;
    if (err) {
      err.forEach(e => dispatch(setAlert(e.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};
export const loadUser = (append = '') => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`/api/auth${append}`);
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_FAIL
    });
  }
};
export const login = (
  { email, password },
  client = false
) => async dispatch => {
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };
  const append = client ? '/client' : '';
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(`/api/auth${append}`, body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser(append));
  } catch (error) {
    const err = error.response.data.errors;
    if (err) {
      err.forEach(e => dispatch(setAlert(e.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};
export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });

  dispatch({ type: CLEAR_PROFILE });
};
