import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const Expert = ({
  path,
  component: Component,
  auth: { isAuthen, loading, type },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (
          isAuthen &&
          !loading &&
          (type === 'expert' ? (
            <Component {...props} />
          ) : (
            <Redirect to={`expert/redirection${path}`} />
          ))
        );
      }}
    />
  );
};

Expert.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Expert);
