import axios from 'axios';
import {
  GET_JOB,
  JOB_ERROR,
  JOB_DELETED,
  GET_ALLJOB,
  RESET_JOB
} from './types';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';
export const createJob = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post('/api/job', formData, config);
    dispatch({
      type: GET_JOB,
      payload: res.data
    });
    history.push('/jobs');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
export const deleteJob = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/job/${id}`);

    dispatch({
      type: JOB_DELETED
    });

    dispatch({
      type: GET_ALLJOB,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
export const getAllJob = () => async dispatch => {
  try {
    const res = await axios.get('api/job');
    dispatch({
      type: GET_ALLJOB,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
export const getJobById = id => async dispatch => {
  try {
    const res = await axios.get(`api/job/${id}`);
    dispatch({
      type: GET_JOB,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const updateJob = (formData, history, id) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.put(`/api/job/${id}`, formData, config);
    dispatch({
      type: GET_JOB,
      payload: res.data
    });
    history.push('/jobs');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
export const resetJob = () => dispatch => {
  dispatch({
    type: RESET_JOB
  });
};
