import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { deleteExperience } from '../../actions/profile';
import { connect } from 'react-redux';
function Experience({ experience, deleteExperience }) {
  const experiences = experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className='hide-sm'>{exp.title}</td>
      <td className='hide-sm'>
        <Moment format='MMMM YYYY'>{exp.from}</Moment> -{' '}
        {exp.current ? 'Now' : <Moment format='MMMM YYYY'>{exp.to}</Moment>}
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => {
            deleteExperience(exp._id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <div>
      <h2 className='my-2'>Experience</h2>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Date</th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </div>
  );
}
Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
};
export default connect(null, { deleteExperience })(Experience);
