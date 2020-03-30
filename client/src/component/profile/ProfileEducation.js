import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, from, current, to, description }
}) => {
  return (
    <Fragment>
      <h2 className='text-primary'>Education</h2>
      <div>
        <h3>{school}</h3>
        <p>
          <Moment format='MMMM YYYY'>{from}</Moment> -{' '}
          {to ? <Moment format='MMMM YYYY'>{to}</Moment> : 'Now'}
        </p>
        <p>
          <strong>Degree: </strong>
          {degree}
        </p>
        <p>
          <strong>Field Of Study: </strong>
          {fieldofstudy}
        </p>
        <p>
          <strong>Description: </strong>
          {description}
        </p>
      </div>
    </Fragment>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired
};

export default ProfileEducation;
