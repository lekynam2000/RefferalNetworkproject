import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { verify_register } from '../../actions/auth';
import Spinner from '../layout/Spinner';
function VerifySuccess({ match, verify_register, auth }) {
  useEffect(() => {
    verify_register(match.params.email, match.params.verify_id);
    console.log(match.params.email);
    console.log(match.params.verify_id);
  });
  return auth.loading ? <Spinner /> : <Redirect to='/dashboard' />;
}
const mapStatetoProps = state => ({
  auth: state.auth
});
export default connect(mapStatetoProps, { verify_register })(
  withRouter(VerifySuccess)
);
