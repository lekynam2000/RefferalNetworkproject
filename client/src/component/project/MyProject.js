import React from 'react';
import PropTypes from 'prop-types';
import {
  getMyProject,
  resetProject,
  deleteProject
} from '../../actions/project';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
function MyProject({
  project: { projects, loading },
  getMyProject,
  resetProject,
  deleteProject
}) {
  useEffect(() => {
    resetProject();
    getMyProject();
  }, [resetProject, getMyProject]);
  return (
    <div className='project-list'>
      <Link to='create-project' className='btn btn-primary'>
        Create new Project
      </Link>
      {!loading &&
        projects.length > 0 &&
        projects.map(project => {
          let {
            _id,
            title,
            fieldofexpert,
            skills,
            location,
            experienceRequired,
            description
          } = project;

          return (
            <div key={_id} className='project-item'>
              {title && <div className='project-item-title'>{title}</div>}

              {fieldofexpert && (
                <div className='project-item-fieldofexpert'>
                  {fieldofexpert}
                </div>
              )}
              {skills && (
                <ul className='project-item-skills'>
                  <Fragment>
                    {skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </Fragment>
                </ul>
              )}
              {location && (
                <div className='project-item-location'>{location}</div>
              )}
              {experienceRequired && (
                <div className='project-item-experienceRequired'>
                  {experienceRequired}
                </div>
              )}

              {description && (
                <div className='project-item-description'>{description}</div>
              )}
              <Link to={`/applicants/${_id}`}>View applicant</Link>
              <Fragment>
                <Link to={`edit-project/${_id}`} className='btn btn-primary'>
                  Update
                </Link>

                <button
                  className='btn btn-danger'
                  onClick={() => {
                    deleteProject(_id);
                  }}
                >
                  Delete
                </button>
              </Fragment>
            </div>
          );
        })}
    </div>
  );
}
const mapStatetoProps = state => ({
  project: state.project
});
MyProject.propTypes = {
  getMyProject: PropTypes.func.isRequired,
  resetProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired
};

export default connect(mapStatetoProps, {
  getMyProject,
  resetProject,
  deleteProject
})(MyProject);
