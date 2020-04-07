import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_FAIL,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  ACCOUNT_DELETED,
  AUTH_RESET,
} from '../actions/types';
const initialState = {
  token: localStorage.getItem('token'),
  loading: true,
  isAuthen: null,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        ...payload,
        isAuthen: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthen: true,
        loading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthen: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token');
      return {
        ...initialState,
        loading: false,
        isAuthen: false,
      };
    case AUTH_RESET:
      return {
        ...initialState,
        loading: true,
      };
    default:
      return state;
  }
}
