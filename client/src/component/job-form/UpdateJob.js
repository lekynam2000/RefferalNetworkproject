import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getJobById, updateJob, resetJob } from '../../actions/job';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import CompanySelection from './CompanySelection';

function UpdateJob({
  updateJob,
  getJobById,
  history,
  setAlert,
  job: { jobs, loading },
  match
}) {
  var job = jobs.filter(job => job._id.toString() === match.params.id)[0];
  const [formData, setFormData] = useState(job);

  var {
    title,
    company_id,
    company_name,
    role,
    salary,
    location,
    type,
    expire,
    referral_fee,
    description,
    requirements
  } = formData;
  salary = JSON.parse(salary);
  const onCompanyChange = (companyId, companyName) => {
    setFormData({
      ...formData,
      company_id: companyId,
      company_name: companyName
    });
  };
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
    if (formData.company_id) {
      updateJob(formData, history, match.params.id);
      e.preventDefault();
    } else {
      e.preventDefault();
      setAlert('Please enter valid company');
    }
  };
  return (
    !loading && (
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
            <CompanySelection
              onChangeParent={onCompanyChange}
              defaultValue={company_name}
            />
          </div>{' '}
          <div className='form-group'>
            <input
              type='text'
              placeholder='Role'
              name='role'
              value={role}
              onChange={e => onChange(e)}
            />{' '}
            <small className='form-text'>
              Could be your own or a company website{' '}
            </small>{' '}
          </div>{' '}
          <div className='form-group'>
            <input
              type='text'
              placeholder='Salary money value'
              name='value'
              value={salary.value}
              onChange={e => onChange(e)}
            />{' '}
            <small className='form-text'>
              Could be your own or a company website{' '}
            </small>{' '}
          </div>{' '}
          <div className='form-group'>
            <input
              type='text'
              placeholder='Salary money unit'
              name='unit'
              value={salary.unit}
              onChange={e => onChange(e)}
            />{' '}
            <small className='form-text'>
              Could be your own or a company website{' '}
            </small>{' '}
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
            <small className='form-text'>
              {' '}
              Tell us a little about yourself{' '}
            </small>{' '}
          </div>
          <div className='form-group'>
            <textarea
              placeholder='Job requirements'
              name='requirements'
              value={requirements}
              onChange={e => onChange(e)}
            />{' '}
            <small className='form-text'>
              {' '}
              Tell us a little about yourself{' '}
            </small>{' '}
          </div>
          <input type='submit' className='btn btn-primary my-1' />
          <Link className='btn btn-light my-1' to='/dashboard'>
            Go Back{' '}
          </Link>{' '}
        </form>{' '}
      </Fragment>
    )
  );
}
UpdateJob.propTypes = {
  updateJob: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired
};
const mapStatetoProps = state => ({
  job: state.job
});
export default connect(mapStatetoProps, { updateJob, getJobById, setAlert })(
  withRouter(UpdateJob)
);
