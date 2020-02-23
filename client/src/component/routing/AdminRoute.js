import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({
  path: path,
  component: Component,
  auth: { isAuthen, loading, type },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        return isAuthen && !loading && type === 'admin' ? (
          <Component {...props} />
        ) : (
          <Redirect to={`redirection${path}`} />
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
