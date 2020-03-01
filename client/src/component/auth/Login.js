import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
function Login({ login, isAuthen, usertype }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [type, setType] = useState('expert');
  const handleType = e => {
    setType(e.target.value);
  };
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    var isClient = type === 'client';
    login({ email, password }, isClient);
  };
  const { email, password } = formData;

  if (isAuthen && usertype === 'expert') {
    return <Redirect to='/dashboard/' />;
  }
  if (isAuthen && usertype === 'client') {
    return <Redirect to='/myproject' />;
  }
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign In Your Account
      </p>
      <form
        className='form'
        action='create-profile.html'
        onSubmit={e => onSubmit(e)}
      >
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>

        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <form action=''>
        <div className='radio'>
          <label>
            <input
              type='radio'
              value='expert'
              checked={type === 'expert'}
              onChange={e => {
                handleType(e);
              }}
            />
            Expert
          </label>
          <label>
            <input
              type='radio'
              value='client'
              checked={type === 'client'}
              onChange={e => {
                handleType(e);
              }}
            />
            Client
          </label>
        </div>
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/'>Sign Up</Link>
      </p>
    </Fragment>
  );
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthen: PropTypes.bool
};
const mapStatetoProps = state => ({
  isAuthen: state.auth.isAuthen,
  usertype: state.auth.type
});
export default connect(mapStatetoProps, { login })(Login);
