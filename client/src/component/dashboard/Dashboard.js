import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import DashboardAction from './DashboardAction';
import Experience from './Experience';
import Education from './Education';
import Spinner from '../layout/Spinner';
import { deleteAccount } from '../../actions/profile';
function Dashboard({
  auth: { user },
  profile: { profile, loading },
  getCurrentProfile,
  deleteAccount,
}) {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile == null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p>
        <i className='fas fa-user'></i>{' '}
        <span>Welcome {user && user.name}.</span>
        <br></br>
        <span>Role:{user && user.type.toUpperCase()}</span>
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardAction />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
        </Fragment>
      ) : (
        <Fragment>
          <p>You has not create profile</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStatetoProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStatetoProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
