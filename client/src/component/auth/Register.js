import React, { Fragment, useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { LinkedIn } from 'react-linkedin-login-oauth2';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register, loginByFacebook, loginByLinkedin } from '../../actions/auth';
import PropTypes from 'prop-types';
import axios from 'axios';
function Register({
  setAlert,
  register,
  isAuthen,
  loginByFacebook,
  loginByLinkedin,
  match,
  history,
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const onChange = (e) => {
    if (e.target.type !== 'radio') {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, type: e.target.value });
    }
  };
  const componentClicked = () => {};
  const responseFacebook = (res) => {
    loginByFacebook(match.params.type, res.accessToken);
  };
  const responseLinkedin = async (res) => {
    const accessToken = await axios.get(
      `/api/auth/linkedin_code?code=${res.code}&redirect_uri=${
        window.location.href + '/linkedin'
      }`
    );
    console.log(accessToken.data);
    loginByLinkedin(match.params.type, accessToken.data);
  };

  const onSubmit = async (e) => {
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
      <form
        id='login-box'
        action='create-profile.html'
        onSubmit={(e) => onSubmit(e)}
      >
        <div class='left'>
          <h1>
            Sign up as{' '}
            {match.params.type.replace(/^\w/, (c) => c.toUpperCase())}
          </h1>

          <input
            type='text'
            name='name'
            placeholder='Username'
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
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
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            minLength='6'
            value={password2}
            onChange={(e) => onChange(e)}
          />

          <input type='submit' name='signup_submit' value='Sign me up' />
        </div>

        <div class='right'>
          <span class='loginwith'>
            Sign in with
            <br />
            social network
          </span>
          <FacebookLogin
            appId={'1620946568102414'}
            autoLoad={false}
            reAuthenticate={true}
            fields='name,email,picture'
            onClick={() => {
              componentClicked();
            }}
            cssClass='social-signin facebook'
            callback={responseFacebook}
          />

          <LinkedIn
            clientId={'81ajfr3c1z7ukl'}
            onFailure={responseLinkedin}
            onSuccess={responseLinkedin}
            state='34232423ujhfgdghhgf'
            scope='r_emailaddress r_liteprofile'
            redirectUri={window.location.href + '/linkedin'}
            renderElement={({ onClick, disabled }) => (
              <button
                class='social-signin linkedin'
                onClick={onClick}
                disabled={disabled}
              >
                Login with Linkedin
              </button>
            )}
          ></LinkedIn>
        </div>
        <div class='or'>OR</div>
      </form>
    </Fragment>
  );
}
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthen: PropTypes.bool,
};
const mapStatetoProps = (state) => ({
  isAuthen: state.auth.isAuthen,
});
export default connect(mapStatetoProps, {
  setAlert,
  register,
  loginByFacebook,
  loginByLinkedin,
})(withRouter(Register));
