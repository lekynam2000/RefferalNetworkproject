import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({
  component: Component,
  auth: { isAuthen, loading, user },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        return !loading && isAuthen && user.type === 'admin' ? (
          <Component {...props} />
        ) : isAuthen ? (
          <Redirect to='/dashboard' />
        ) : (
          <Redirect to='/login' />
        );
      }}
    />
  );
};

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(AdminRoute);
