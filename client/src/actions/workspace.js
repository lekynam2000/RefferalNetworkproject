import {
  GET_WORKSPACE,
  GET_WORKSPACES,
  WORKSPACE_FAIL,
  RESET_WORKSPACE,
  GET_PROJECT,
} from './types';
import axios from 'axios';
export const getWorkspace = (id) => async (dispatch) => {
  try {
    console.log(id);
    const res = await axios.get(`/api/workspace?id=${id}`);
    dispatch({
      type: GET_WORKSPACE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: WORKSPACE_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const getMyWorkspace = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/workspace/me');
    dispatch({
      type: GET_WORKSPACES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: WORKSPACE_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const createWorkspace = (project, client, expert) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = {
      client,
      project,
      expert,
    };
    const res = await axios.post('/api/workspace', body, config);
    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: WORKSPACE_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const resetWorkspace = () => (dispatch) => {
  dispatch({
    type: RESET_WORKSPACE,
  });
};
export const addTask = (problem, workspace) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put(
      `/api/workspace/${workspace}/task`,
      { problem },
      config
    );
    dispatch({
      type: GET_WORKSPACE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: WORKSPACE_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const addSolution = (solution, workspace, task) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put(
      `/api/workspace/${workspace}/task/${task}/solution`,
      { solution },
      config
    );
    dispatch({
      type: GET_WORKSPACE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: WORKSPACE_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const addDiscussion = (discussion, workspace, task) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put(
      `/api/workspace/${workspace}/task/${task}/discussion`,
      { discussion },
      config
    );
    dispatch({
      type: GET_WORKSPACE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: WORKSPACE_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
