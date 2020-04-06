import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

function AddEducation({ addEducation, history }) {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: ``,
    to: ``,
    current: false,
    description: '',
  });
  const [disableToDate, toggleDisableToDate] = useState(false);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData;
  return (
    <div className='form-container'>
      <h1 className='large text-primary'>Add An Education</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any school that you have had
        in the past
      </p>
      <small>* = required field</small>
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
          addEducation(formData, history);
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='* School'
            name='school'
            value={school}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Degree'
            name='degree'
            value={degree}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Field of study'
            name='fieldofstudy'
            value={fieldofstudy}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input
            type='month'
            name='from'
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              checked={current}
              value=''
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggleDisableToDate(!disableToDate);
              }}
            />{' '}
            Current School
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input
            type='month'
            name='to'
            value={to}
            onChange={(e) => onChange(e)}
            disabled={disableToDate ? 'disable' : ''}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Job Description'
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' value='Submit' />
        <a className='btn btn-light my-1 return-btn' href='dashboard'>
          Go Back
        </a>
      </form>
    </div>
  );
}
export default connect(null, { addEducation })(withRouter(AddEducation));
