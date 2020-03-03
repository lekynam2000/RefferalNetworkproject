import React from 'react';
import PropTypes from 'prop-types';
import { getMultipleProject, resetProject } from '../../actions/project';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
function AppliedProject({
  auth: { application },
  project: { projects, loading }
}) {
  useEffect(() => {
    resetProject();
    getMultipleProject(application);
  }, [resetProject, getMultipleProject]);
  return (
    <div className='project-list'>
      <Link to='create-project' className='btn btn-primary'>
        Create new Project
      </Link>
      {!auth.loading &&
        !loading &&
        projects.length > 0 &&
        projects.map(project => {
          let { _id, title, fieldofexpert, skills, location } = project;

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
              <Link to='view/:id'>View more</Link>
            </div>
          );
        })}
    </div>
  );
}
const mapStatetoProps = state => ({
  project: state.project,
  auth: state.auth
});
AppliedProject.propTypes = {
  getMultipleProject: PropTypes.func.isRequired,
  resetProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default connect(mapStatetoProps, {
  getMultipleProject,
  resetProject
})(AppliedProject);
