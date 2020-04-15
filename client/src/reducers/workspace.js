import {
  GET_WORKSPACE,
  GET_WORKSPACES,
  WORKSPACE_FAIL,
  RESET_WORKSPACE,
} from '../actions/types';

const initialState = {
  workspace: null,
  workspaces: [],
  loading: true,
  errors: {},
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_WORKSPACE:
      return { ...state, workspace: payload, loading: false };
    case GET_WORKSPACES:
      return { ...state, workspaces: payload, loading: false };
    case RESET_WORKSPACE:
      return { ...state, loading: true };
    case WORKSPACE_FAIL:
      return { ...state, errors: payload };
    default:
      return state;
  }
}
