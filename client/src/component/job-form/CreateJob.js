import React, { Fragment, useState } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createJob } from '../../actions/job';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';

function CreateJob({ createJob, history, setAlert }) {
  const [formData, setFormData] = useState({
    title: '',
    role: '',
    salary: {
      value: '',
      unit: ''
    },
    location: '',
    type: '',
    expire: '',
    referral_fee: '',
    description: '',
    requirements: ''
  });

  const {
    title,
    role,
    salary,
    location,
    type,
    expire,
    referral_fee,
    description,
    requirements
  } = formData;

  const onChange = e => {
    if (e.target.name == 'value' || e.target.name == 'unit') {
      setFormData({
        ...formData,
        salary: { ...salary, [e.target.name]: e.target.value }
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const onSubmit = e => {
    createJob(formData, history);
    e.preventDefault();
  };
  return (
    <Fragment>
      <h1 className='large text-primary'> Create A Job </h1>{' '}
      <p className='lead'>
        <i className='fas fa-user' /> Let 's get some information to make your
        job stand out{' '}
      </p>{' '}
      <small> * = required field </small>{' '}
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          {' '}
          <input
            type='text'
            placeholder='* Title'
            name='title'
            value={title}
            onChange={e => onChange(e)}
          />{' '}
          <small className='form-text'>Provide job title </small>
        </div>{' '}
        <div className='form-group'>
          <input
            type='text'
            placeholder='Role'
            name='role'
            value={role}
            onChange={e => onChange(e)}
          />{' '}
          <small className='form-text'></small>{' '}
        </div>{' '}
        <div className='form-group'>
          <input
            type='text'
            placeholder='Salary money value'
            name='value'
            value={salary.value}
            onChange={e => onChange(e)}
          />{' '}
          <small className='form-text'>Enter salary value</small>{' '}
        </div>{' '}
        <div className='form-group'>
          <input
            type='text'
            placeholder='Salary money unit'
            name='unit'
            value={salary.unit}
            onChange={e => onChange(e)}
          />{' '}
          <small className='form-text'>Enter salary unit </small>{' '}
        </div>{' '}
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={e => onChange(e)}
          />{' '}
        </div>{' '}
        <div className='form-group'>
          <input
            type='text'
            placeholder='Job type'
            name='type'
            value={type}
            onChange={e => onChange(e)}
          />{' '}
          <small className='form-text'>
            Eg: Full-time, Part-time, Intern, ...{' '}
          </small>{' '}
        </div>{' '}
        <div className='form-group'>
          <h4>Expired Date</h4>
          <input
            type='date'
            name='expire'
            value={expire}
            onChange={e => onChange(e)}
          />{' '}
        </div>{' '}
        <div className='form-group'>
          <input
            type='text'
            placeholder='Referral_fee'
            name='referral_fee'
            value={referral_fee}
            onChange={e => onChange(e)}
          />{' '}
        </div>{' '}
        <div className='form-group'>
          <textarea
            placeholder='Job description'
            name='description'
            value={description}
            onChange={e => onChange(e)}
          />{' '}
          <small className='form-text'> Tell us a little about yourself </small>{' '}
        </div>
        <div className='form-group'>
          <textarea
            placeholder='Job requirements'
            name='requirements'
            value={requirements}
            onChange={e => onChange(e)}
          />{' '}
          <small className='form-text'> Tell us a little about yourself </small>{' '}
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back{' '}
        </Link>{' '}
      </form>{' '}
    </Fragment>
  );
}
CreateJob.propTypes = {
  createJob: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};
export default connect(null, { createJob, setAlert })(withRouter(CreateJob));
