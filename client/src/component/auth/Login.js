import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

function Login({ login, isAuthen }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };
  const { email, password } = formData;

  if (isAuthen) {
    return <Redirect to='/dashboard/' />;
  }
  return (
    <Fragment>
      <form
        id='login-box'
        action='create-profile.html'
        onSubmit={(e) => onSubmit(e)}
      >
        <div class='left'>
          <h1>Sign in</h1>

          <input
            type='text'
            name='email'
            placeholder='E-mail'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={(e) => onChange(e)}
          />

          <input type='submit' name='signup_submit' value='Login' />
        </div>

        <div class='right'>
          <span class='loginwith'>Sign up or Sign in with social network</span>
          <Link to='/register/client'>
            <button className='social-signin facebook'>Become a client</button>
          </Link>
          <Link to='/register/expert'>
            <button className='social-signin linkedin'>Become an expert</button>
          </Link>
        </div>
        <div class='or'>OR</div>
      </form>
    </Fragment>
  );
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthen: PropTypes.bool,
};
const mapStatetoProps = (state) => ({
  isAuthen: state.auth.isAuthen,
});
export default connect(mapStatetoProps, { login })(Login);
