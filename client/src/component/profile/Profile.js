import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfileByUserId } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
const Profile = ({
  profile: { profile, loading },
  auth,
  getProfileByUserId,
  match
}) => {
  useEffect(() => {
    getProfileByUserId(match.params.id);
    console.log(match.params.id);
  }, [getProfileByUserId, match.params.id]);
  return (
    <Fragment>
      {loading || (profile == null && <Spinner />)}
      <Link to='/profiles' className='btn btn-light'>
        Back to Profiles List
      </Link>
      {auth.isAuthen &&
        !auth.loading &&
        auth.user._id.toString() === match.params.id && (
          <Link to='/edit-profile' className='btn btn-dark'>
            Edit Profile
          </Link>
        )}
      {profile && (
        <Fragment>
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className='profile-exp bg-white p-2'>
              {profile.experience.length > 0 ? (
                profile.experience.map((exp, index) => (
                  <ProfileExperience
                    key={index}
                    experience={exp}
                  ></ProfileExperience>
                ))
              ) : (
                <h4> No Experience</h4>
              )}
            </div>
            <div className='profile-edu bg-white p-2'>
              {profile.education.length > 0 ? (
                profile.education.map((edu, index) => (
                  <ProfileEducation
                    key={index}
                    education={edu}
                  ></ProfileEducation>
                ))
              ) : (
                <h4>No Education</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProfileByUserId: PropTypes.func.isRequired
};

const mapStatetoProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStatetoProps, { getProfileByUserId })(Profile);
