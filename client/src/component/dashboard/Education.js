import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { deleteEducation } from '../../actions/profile';
import { connect } from 'react-redux';
function Education({ education, deleteEducation }) {
  const educations = education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className='hide-sm'>{edu.degree}</td>
      <td className='hide-sm'>
        <Moment format='MMMM YYYY'>{edu.from}</Moment> -{' '}
        {edu.current ? 'Now' : <Moment format='MMMM YYYY'>{edu.to}</Moment>}
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => {
            deleteEducation(edu._id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <div>
      <h2 className='my-2'>Education</h2>
      <table>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Date</th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </div>
  );
}
Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};
export default connect(null, { deleteEducation })(Education);
