import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createCompany } from '../../actions/company';
import PropTypes from 'prop-types';

function CreateCompany({ createCompany, history }) {
  const [formData, setFormData] = useState({
    name: '',
    avatar: '',
    contact: {
      facebook: '',
      linkedin: '',
      web: ''
    },
    description: '',
    benefit: '',
    culture: '',
    photo: ''
  });

  const {
    name,
    avatar,
    contact,
    description,
    benefit,
    culture,
    photo
  } = formData;

  const onChange = e => {
    if (
      e.target.name === 'facebook' ||
      e.target.name === 'linkedin' ||
      e.target.name === 'web'
    ) {
      setFormData({
        ...formData,
        contact: { ...contact, [e.target.name]: [e.target.value] }
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const onSubmit = e => {
    createCompany(formData, history);
  };
  return (
    <Fragment>
      <h1 className='large text-primary'> Create A Job </h1>{' '}
      <p className='lead'>
        <i className='fas fa-user' /> Let 's get some information to make your
        company stand out{' '}
      </p>{' '}
      <small> * = required field </small>{' '}
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          {' '}
          <input
            type='text'
            placeholder='* Company Name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
          />{' '}
          <small className='form-text'>Provide company name </small>
        </div>{' '}
        <div className='form-group'>
          <input
            type='text'
            placeholder='Avartar'
            name='avatar'
            value={avatar}
            onChange={e => onChange(e)}
          />{' '}
          <img src={avatar}></img>
        </div>{' '}
        <div className='form-group'>
          <input
            type='text'
            placeholder='Facebook'
            name='facebook'
            value={contact.facebook}
            onChange={e => onChange(e)}
          />{' '}
          <small className='form-text'>
            Could be your own or a company website{' '}
          </small>{' '}
        </div>{' '}
        <div className='form-group'>
          <input
            type='text'
            placeholder='Facebook'
            name='facebook'
            value={contact.facebook}
            onChange={e => onChange(e)}
          />{' '}
          <small className='form-text'>
            Could be your own or a company website{' '}
          </small>{' '}
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Facebook'
            name='facebook'
            value={contact.facebook}
            onChange={e => onChange(e)}
          />{' '}
          <small className='form-text'>
            Could be your own or a company website{' '}
          </small>{' '}
        </div>
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
          <textarea
            placeholder='Company description'
            name='description'
            value={description}
            onChange={e => onChange(e)}
          />{' '}
          <small className='form-text'> Tell us a little about company </small>{' '}
        </div>
        <div className='form-group'>
          <textarea
            placeholder='Benefit'
            name='benefit'
            value={benefit}
            onChange={e => onChange(e)}
          />{' '}
          <small className='form-text'> Tell us a little about yourself </small>{' '}
        </div>
        <div className='form-group'>
          <textarea
            placeholder='Company culture'
            name='culture'
            value={culture}
            onChange={e => onChange(e)}
          />{' '}
          <small className='form-text'> Tell us a little about company </small>{' '}
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder="Company's photo URL"
            name='photo'
            value={photo}
            onChange={e => onChange(e)}
          />{' '}
          <small className='form-text'> Tell us a little about company </small>{' '}
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back{' '}
        </Link>{' '}
      </form>{' '}
    </Fragment>
  );
}
CreateCompany.propTypes = {
  createCompany: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};
export default connect(null, { createCompany })(withRouter(CreateCompany));
