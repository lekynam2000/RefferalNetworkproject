import {
  GET_COMPANY,
  COMPANY_ERROR,
  COMPANY_DELETED,
  GET_ALLCOMPANY
} from '../actions/types';

const initialState = {
  company: null,
  companies: [],
  loading: true,
  errors: {}
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_COMPANY:
      return { ...state, company: payload, loading: false };
    case GET_ALLCOMPANY:
      return { ...state, companies: payload, loading: false };
    case COMPANY_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload
      };
    case COMPANY_DELETED: {
      return { ...state, company: null, companies: [], loading: true };
    }
    default:
      return state;
  }
}
