import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

const Profiles = ({ getAllProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);
  return (
    <Fragment>
      {loading || profiles.length === 0 ? (
        <Spinner />
      ) : (
        profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ))
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getAllProfiles: PropTypes.func.isRequired
};
const mapStatetoProps = state => ({
  profile: state.profile
});

export default connect(mapStatetoProps, { getAllProfiles })(Profiles);
