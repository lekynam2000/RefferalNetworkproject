import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { deleteEducation } from '../../actions/profile';
import { connect } from 'react-redux';
function Education({ education, deleteEducation }) {
  const educations = education.map((edu) => (
    <div className='education-item' key={edu._id}>
      <h4 className='edu-head'>
        <span>
          {edu.degree} at {edu.school}
        </span>
        <span
          className='btn btn-danger fl-right'
          onClick={() => {
            deleteEducation(edu._id);
          }}
        >
          <i class='fas fa-trash-alt'></i>
        </span>
      </h4>
      <div className='edu-duration'>
        <Moment format='MMMM YYYY'>{edu.from}</Moment> -{' '}
        {edu.current ? 'Now' : <Moment format='MMMM YYYY'>{edu.to}</Moment>}
      </div>
      <div className='edu-fieldofstudy'>{edu.fieldofstudy}</div>
      <div className='edu-description'>{edu.description}</div>
    </div>
  ));
  return (
    <div className='e-wrapper'>
      <Link to='/add-education' className='btn btn-light fl-right add-btn'>
        <i className='fas fa-plus-square'></i>
      </Link>
      <h2 className='my-2'>Education</h2>

      <div className='education-list'>{educations}</div>
    </div>
  );
}
Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};
export default connect(null, { deleteEducation })(Education);
