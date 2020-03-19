import React, { Fragment, useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register, loginByFacebook } from '../../actions/auth';
import PropTypes from 'prop-types';
import facebook from '../../private_key/facebook';

function Register({
  setAlert,
  register,
  isAuthen,
  loginByFacebook,
  match,
  history
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const onChange = e => {
    if (e.target.type !== 'radio') {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, type: e.target.value });
    }
  };
  const componentClicked = () => {};
  const responseFacebook = res => {
    loginByFacebook(match.params.type, res.accessToken);
  };
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      var type = match.params.type;
      register({ name, email, password, type }, history);
    }
  };
  const { name, email, password, password2 } = formData;
  if (isAuthen) {
    return <Redirect to='/dashboard/' />;
  }
  return (
    <Fragment>
      <h1 className='large text-primary'> Sign Up </h1>
      <p className='lead'>
        <i className='fas fa-user'> </i> Create Your Account
      </p>
      <form
        className='form'
        action='create-profile.html'
        onSubmit={e => onSubmit(e)}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
            required
          />
        </div>
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
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            minLength='6'
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>

      <p className='my-1'>
        Already have an account ?{' '}
        <Link to={`/login/${match.params.type}`}> Sign In </Link>
      </p>
      <p className='boundary'>Or</p>
      <FacebookLogin
        appId={facebook.AppID}
        autoLoad={false}
        reAuthenticate={true}
        fields='name,email,picture'
        onClick={() => {
          componentClicked();
        }}
        callback={responseFacebook}
      />
    </Fragment>
  );
}
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthen: PropTypes.bool
};
const mapStatetoProps = state => ({
  isAuthen: state.auth.isAuthen
});
export default connect(mapStatetoProps, {
  setAlert,
  register,
  loginByFacebook
})(withRouter(Register));
