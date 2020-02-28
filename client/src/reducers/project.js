import {
  GET_PROJECT,
  PROJECT_ERROR,
  PROJECT_DELETED,
  GET_ALLPROJECT,
  RESET_PROJECT
} from '../actions/types';

const initialState = {
  project: null,
  projects: [],
  loading: true,
  errors: {}
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROJECT:
      return { ...state, project: payload, loading: false };
    case GET_ALLPROJECT:
      return { ...state, projects: payload, loading: false };
    case PROJECT_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload
      };
    case PROJECT_DELETED: {
      return { ...state, project: null, projects: [], loading: true };
    }
    case RESET_PROJECT: {
      return { ...state, loading: true };
    }
    default:
      return state;
  }
}
