import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({
  path,
  component: Component,
  auth: { isAuthen, loading, type },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        return isAuthen ? (
          !loading &&
            (type === 'admin' ? (
              <Component {...props} />
            ) : (
              <Redirect to={`admin/redirection${path}`} />
            ))
        ) : (
          <Redirect to={`/login`} />
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
