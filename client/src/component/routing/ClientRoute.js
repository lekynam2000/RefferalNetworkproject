import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ClientRoute = ({
  path,
  component: Component,
  auth: { isAuthen, loading, type },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        return isAuthen
          ? !loading &&
              (type === 'client' ? (
                <Component {...props} />
              ) : (
                <Redirect to={`client/redirection${path}`} />
              ))
          : isAuthen === false && <Redirect to={`/login`} />;
      }}
    />
  );
};

ClientRoute.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(ClientRoute);
