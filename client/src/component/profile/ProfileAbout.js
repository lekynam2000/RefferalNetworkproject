import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  return (
    <div className='profile-about bg-white p-2'>
      {bio && (
        <Fragment>
          <h2 className='text-primary'>Summary</h2>
          <p className='long-text'>{bio}</p>
        </Fragment>
      )}

      <div className='line'></div>
      <h2 className='text-primary'>Skill Set</h2>
      <div className='skills'>
        {skills.map((skill, index) => (
          <div key={index} className='p-1'>
            <i className='fa fa-check'></i> {skill}
          </div>
        ))}
      </div>
    </div>
  );
};
ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};
export default ProfileAbout;
