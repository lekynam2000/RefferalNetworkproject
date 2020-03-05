import axios from 'axios';
import {
  GET_PROJECT,
  PROJECT_ERROR,
  PROJECT_DELETED,
  GET_ALLPROJECT,
  RESET_PROJECT,
  APPLY_PROJECT
} from './types';
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
    history.push('/myproject');
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
    const res = await axios.get(`/api/project/${id}`);
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
    history.push('/myproject');
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
export const getMyProject = () => async dispatch => {
  try {
    const res = await axios.get('api/project/me');
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
export const getMultipleProject = application => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const id_array = application.map(app => app.project);

    const body = {
      projectList: id_array
    };
    const res = await axios.post('api/project/multiple', body, config);
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
export const applyProject = id => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = {
      project: id
    };
    await axios.put('/api/project/apply', body, config);
    dispatch({
      type: APPLY_PROJECT
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
export const acceptApplication = (project, user) => async dispatch => {
  try {
    const res = await axios.put(`/api/project/accept/${project}/user/${user}`);
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
export const approveApplication = (project, user) => async dispatch => {
  try {
    const res = await axios.put(`/api/project/approve/${project}/user/${user}`);
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
export const resetProject = () => dispatch => {
  dispatch({
    type: RESET_PROJECT
  });
};
