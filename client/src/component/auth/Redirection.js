import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const Redirection = ({ type, match, usertype = 'admin' }) => {
  return (
    type == usertype && <Redirect to={`/${match.params.endpoint}`}></Redirect>
  );
};

Redirection.propTypes = {
  type: PropTypes.string.isRequired
};
const mapStatetoProps = state => ({
  type: state.auth.type
});
export default connect(mapStatetoProps)(Redirection);
