import axios from 'axios';
import {
  GET_ALLCOMPANY,
  GET_COMPANY,
  COMPANY_ERROR,
  COMPANY_DELETED
} from './types';
import { setAlert } from './alert';

export const createCompany = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post('/api/company', formData, config);
    dispatch({
      type: GET_COMPANY,
      payload: res.data
    });
    history.push('/companies');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({
      type: COMPANY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
export const deleteCompany = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/company/${id}`);

    dispatch({
      type: COMPANY_DELETED
    });
    const companies = await axios.get('/api/companies');
    dispatch({
      type: GET_ALLCOMPANY,
      payload: companies
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: COMPANY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
export const getAllCompanies = () => async dispatch => {
  try {
    const res = await axios.get('api/company');
    dispatch({
      type: GET_ALLCOMPANY,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: COMPANY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
