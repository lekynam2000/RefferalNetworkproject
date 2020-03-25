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
  { name, email, password, type },
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };
  const body = JSON.stringify({ name, email, password, type });

  try {
    await axios.post(`/api/user`, body, config);
    history.push('/verify-wait');
  } catch (error) {
    console.log(error);
    const err = error.response.data.errors;
    if (err) {
      err.forEach(e => dispatch(setAlert(e.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const verify_register = (email, verify_id) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };
    const body = JSON.stringify({ email, verify_id });

    const res = await axios.post('/api/user/verify', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (error) {
    console.log(error);
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`/api/auth`);
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

export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(`/api/auth`, body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (error) {
    console.log(error);
    const err = error.response.data.errors;
    if (err) {
      err.forEach(e => dispatch(setAlert(e.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const logout = history => dispatch => {
  dispatch({
    type: LOGOUT
  });

  dispatch({ type: CLEAR_PROFILE });
  history.push('/');
};

export const loginByFacebook = (user_type, accessToken) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };
    const res = await axios.post(
      `/api/auth/facebook/${user_type}`,
      {
        access_token: accessToken
      },
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (error) {
    dispatch(setAlert(error.msg, 'danger'));
    dispatch({
      type: LOGIN_FAIL
    });
  }
};
export const loginByLinkedin = (user_type, accessToken) => async dispatch => {
  console.log(user_type, accessToken);
  try {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };
    const res = await axios.post(
      `/api/auth/linkedin/${user_type}`,
      {
        access_token: accessToken
      },
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (error) {
    dispatch(setAlert(error.msg, 'danger'));
    dispatch({
      type: LOGIN_FAIL
    });
  }
};
