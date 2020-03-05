import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getProjectById,
  deleteProject,
  applyProject,
  resetProject
} from '../../actions/project';
import { Link, withRouter } from 'react-router-dom';
import Spinner from '../layout/Spinner';
function SingleProject({
  auth,
  project,
  loading,
  getProjectById,
  applyProject,
  deleteProject,
  resetProject,
  match
}) {
  useEffect(() => {
    resetProject();
    getProjectById(match.params.id);
  }, [resetProject, getProjectById, match.params.id]);
  if (loading) return <Spinner></Spinner>;
  else {
    const apply = () => {
      applyProject(match.params.id);
    };
    const isApplied = (project, user) =>
      user.application.filter(app => app.project.toString() === project)
        .length > 0;
    const isAccepted = (project, user) =>
      isApplied(project, user) &&
      user.application.filter(app => app.project.toString() === project)[0]
        .accepted;

    return (
      !loading &&
      project && (
        <div key={project._id} className='project'>
          {project.title && <h2 className='project-title'>{project.title}</h2>}
          {project.fieldofexpert && (
            <div className='project-fieldofexpert'>
              Field Of Expert: {project.fieldofexpert}
            </div>
          )}
          {project.skills && (
            <ul className='project-skills'>
              <Fragment>
                Required Skills:
                {project.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </Fragment>
            </ul>
          )}
          {project.location && (
            <div className='project-location'>{project.location}</div>
          )}
          {project.experienceRequired && (
            <div className='project-experienceRequired'>
              Year of experience required: {project.experienceRequired}
            </div>
          )}

          {project.description && (
            <div className='project-description'>{project.description}</div>
          )}

          {!auth.loading &&
            auth.type === 'expert' &&
            (isApplied(match.params.id, auth.user) ? (
              <button className='btn btn-danger' disabled={true}>
                Applied
              </button>
            ) : (
              <input
                type='submit'
                className='btn btn-primary'
                value='Apply'
                onClick={() => {
                  apply();
                  window.location.reload(false);
                }}
              />
            ))}
          {!auth.loading &&
            auth.type === 'expert' &&
            isAccepted(match.params.id, auth.user) && <h4>You got accepted</h4>}
          {!auth.loading && auth.type === 'admin' && (
            <Fragment>
              <Link
                to={`edit-project/${project._id}`}
                className='btn btn-primary'
              >
                Update
              </Link>

              <button
                className='btn btn-danger'
                onClick={() => {
                  deleteProject(project._id);
                }}
              >
                Delete
              </button>
            </Fragment>
          )}
        </div>
      )
    );
  }
}

const mapStatetoProps = state => ({
  auth: state.auth,
  project: state.project.project,
  loading: state.project.loading
});
export default connect(mapStatetoProps, {
  getProjectById,
  deleteProject,
  applyProject,
  resetProject
})(withRouter(SingleProject));
