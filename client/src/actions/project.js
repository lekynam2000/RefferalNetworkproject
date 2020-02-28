import axios from 'axios';
import {
  GET_PROJECT,
  PROJECT_ERROR,
  PROJECT_DELETED,
  GET_ALLPROJECT,
  RESET_PROJECT
} from './types';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';
export const createProject = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post('/api/project', formData, config);
    dispatch({
      type: GET_PROJECT,
      payload: res.data
    });
    history.push('/projects');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
export const deleteProject = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/project/${id}`);

    dispatch({
      type: PROJECT_DELETED
    });

    dispatch({
      type: GET_ALLPROJECT,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
export const getAllProject = () => async dispatch => {
  try {
    const res = await axios.get('api/project');
    dispatch({
      type: GET_ALLPROJECT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
export const getProjectById = id => async dispatch => {
  try {
    const res = await axios.get(`api/project/${id}`);
    dispatch({
      type: GET_PROJECT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const updateProject = (formData, history, id) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.put(`/api/project/${id}`, formData, config);
    dispatch({
      type: GET_PROJECT,
      payload: res.data
    });
    history.push('/projects');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
export const resetProject = () => dispatch => {
  dispatch({
    type: RESET_PROJECT
  });
};
