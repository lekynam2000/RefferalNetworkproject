import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { deleteExperience } from '../../actions/profile';
import { connect } from 'react-redux';
function Experience({ experience, deleteExperience }) {
  const experiences = experience.map((exp) => (
    <div className='experience-item' key={exp._id}>
      <h4 className='exp-head'>
        <span>
          {exp.title} at {exp.company}
        </span>
        <span
          className='btn btn-danger fl-right'
          onClick={() => {
            deleteExperience(exp._id);
          }}
        >
          <i class='fas fa-trash-alt'></i>
        </span>
      </h4>
      <div className='exp-duration'>
        <Moment format='MMMM YYYY'>{exp.from}</Moment> -{' '}
        {exp.current ? 'Now' : <Moment format='MMMM YYYY'>{exp.to}</Moment>}
      </div>
      <div className='exp-location'>{exp.location}</div>
      <div className='exp-description'>{exp.description}</div>
    </div>
  ));
  return (
    <div className='e-wrapper'>
      <Link to='/add-experience' className='btn fl-right add-btn'>
        <i className='fas fa-pen'></i>
      </Link>
      <h2 className='my-2'>Experience</h2>

      <div className='experiences-list'>{experiences}</div>
    </div>
  );
}
Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};
export default connect(null, { deleteExperience })(Experience);
