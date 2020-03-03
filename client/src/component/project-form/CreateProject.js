import React, { Fragment, useState, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProject } from '../../actions/project';
import PropTypes from 'prop-types';

function CreateProject({ createProject, history }) {
  const [formData, setFormData] = useState({
    title: '',
    fieldofexpert: '',
    skills: [],
    location: '',
    experienceRequired: 0,
    description: ''
  });
  const inputSkill = useRef(null);
  const {
    title,
    fieldofexpert,
    skills,
    location,
    experienceRequired,
    description
  } = formData;

  const onChange = e => {
    if (e.target.name !== 'skills') {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const onSubmit = e => {
    createProject(formData, history);
    e.preventDefault();
  };
  const deleteSkill = skill => {
    setFormData({
      ...formData,
      skills: skills.filter(s => s !== skill)
    });
  };
  const addSkill = async skill => {
    await setFormData({ ...formData, skills: [...skills, skill] });
  };
  return (
    <Fragment>
      <h1 className='large text-primary'> Create A Project </h1>{' '}
      <p className='lead'>
        <i className='fas fa-user' /> Let 's get some information to make your
        project stand out{' '}
      </p>{' '}
      <small> * = required field </small>{' '}
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          {' '}
          <input
            type='text'
            placeholder='* Title'
            name='title'
            value={title}
            onChange={e => onChange(e)}
          />{' '}
          <small className='form-text'>Provide project title </small>
        </div>{' '}
        <div className='form-group'>
          {' '}
          <input
            type='text'
            placeholder='* Field of expert'
            name='fieldofexpert'
            value={fieldofexpert}
            onChange={e => onChange(e)}
          />{' '}
          <small className='form-text'>Field of Expert </small>
        </div>{' '}
        <div className='skills'>
          <div className='input-group'>
            <input type='text' name='skill' ref={inputSkill} id='' />
            <div className='input-group-append'>
              <button
                onClick={() => {
                  addSkill(inputSkill.current.value);
                  inputSkill.current.value = '';
                }}
              >
                <i className='far fa-plus-square'></i>
              </button>
            </div>
          </div>

          <ul className='skill-list'>
            {skills.map((skill, index) => {
              var s = skill;
              return (
                <li key={index}>
                  <span>{skill}</span>{' '}
                  <i
                    className='fas fa-times'
                    onClick={() => {
                      deleteSkill(s);
                    }}
                  ></i>
                </li>
              );
            })}
          </ul>
        </div>
        <div className='form-group'>
          {' '}
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={e => onChange(e)}
          />{' '}
          <small className='form-text'>Project's Location </small>
        </div>{' '}
        <div className='form-group'>
          {' '}
          <input
            type='number'
            name='experienceRequired'
            id='year-input'
            value={experienceRequired}
            onChange={e => onChange(e)}
          />{' '}
          <small className='form-text'>Year of experience required </small>
        </div>{' '}
        <div className='form-group'>
          {' '}
          <input
            type='text'
            placeholder='Project description'
            name='description'
            value={description}
            onChange={e => onChange(e)}
          />{' '}
        </div>{' '}
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back{' '}
        </Link>{' '}
      </form>{' '}
    </Fragment>
  );
}
CreateProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};
export default connect(null, { createProject })(withRouter(CreateProject));
