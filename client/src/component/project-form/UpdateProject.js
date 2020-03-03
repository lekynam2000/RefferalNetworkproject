import React, { Fragment, useState, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateProject } from '../../actions/project';
import PropTypes from 'prop-types';

function UpdateProject({
  updateProject,
  history,
  match,
  project: { projects }
}) {
  const projectField = projects.filter(
    project => project._id.toString() === match.params.id
  )[0];
  // console.log(projectField);
  const [formData, setFormData] = useState({
    title: projectField.title,
    fieldofexpert: projectField.fieldofexpert,
    skills: [...projectField.skills],
    location: projectField.location,
    experienceRequired: projectField.experienceRequired,
    description: projectField.description
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
    updateProject(formData, history, match.params.id);
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
      <h1 className='large text-primary'> Update A Project </h1>{' '}
      <p className='lead'>
        <i className='fas fa-user' /> Let 's get some information to make your
        project stand out{' '}
      </p>{' '}
      <small> * = required field </small>{' '}
      <form
        className='form'
        onSubmit={e => {
          if (e.which === 13) {
            console.log(e.which);
            e.preventDefault();
          } else onSubmit(e);
        }}
      >
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
              <span
                className='btn btn-default'
                onClick={() => {
                  addSkill(inputSkill.current.value);
                  inputSkill.current.value = '';
                }}
              >
                <i className='far fa-plus-square'></i>
              </span>
            </div>
          </div>

          <ul className='skill-list'>
            {skills.map((skill, index) => {
              var s = skill;
              return (
                <li key={index}>
                  <span>{skill}</span>{' '}
                  <i
                    class='fas fa-times'
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
            id='year-input'
            name='experienceRequired'
            value={experienceRequired}
            onChange={e => onChange(e)}
          />{' '}
          <small className='form-text'>Year of experience required </small>
        </div>{' '}
        <div className='form-group'>
          {' '}
          <textarea
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
UpdateProject.propTypes = {
  updateProject: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};
const mapStatetoProps = state => ({
  project: state.project
});
export default connect(mapStatetoProps, { updateProject })(
  withRouter(UpdateProject)
);
