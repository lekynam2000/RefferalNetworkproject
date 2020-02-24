import { GET_JOB, JOB_ERROR, JOB_DELETED, GET_ALLJOB } from '../actions/types';

const initialState = {
  job: null,
  jobs: [],
  loading: true,
  errors: {}
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_JOB:
      return { ...state, job: payload, loading: false };
    case GET_ALLJOB:
      return { ...state, jobs: payload, loading: false };
    case JOB_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload
      };
    case JOB_DELETED: {
      return { ...state, job: null, jobs: [], loading: true };
    }
    default:
      return state;
  }
}
