import React, { Fragment, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
// import { loadUser } from '../../actions/auth';
import {
  getProjectById,
  deleteProject,
  applyProject,
  resetProject,
} from '../../actions/project';
import { Link, withRouter } from 'react-router-dom';
import Spinner from '../layout/Spinner';

import Popup from '../layout/Popup';
function SingleProject({
  auth,
  project,
  loading,
  getProjectById,
  applyProject,
  deleteProject,
  resetProject,
  // loadUser,
  match,
}) {
  const linkRef = useRef(null);
  useEffect(() => {
    console.log(1);
    resetProject();
    getProjectById(match.params.id);
  }, [resetProject, getProjectById, match.params.id, auth]);
  if (loading) return <Spinner></Spinner>;
  else {
    const apply = () => {
      applyProject(match.params.id);
    };
    const isApplied = (project, user) =>
      user.application.filter((app) => app.project.toString() === project)
        .length > 0;
    const isAccepted = (project, user) =>
      isApplied(project, user) &&
      user.application.filter((app) => app.project.toString() === project)[0]
        .accepted;

    return (
      !loading &&
      project && (
        <div key={project._id} className='project'>
          {project.title && <h2 className='project-title'>{project.title}</h2>}
          {project.fieldofexpert && (
            <div className='project-fieldofexpert'>
              <b>Field Of Expert:</b> {project.fieldofexpert}
            </div>
          )}
          {project.skills && (
            <Fragment>
              <h4>Required Skills:</h4>
              <ul className='project-skills'>
                {project.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </Fragment>
          )}
          {project.location && (
            <div className='project-location'>
              <b>Location: </b>
              {project.location}
            </div>
          )}
          {project.experienceRequired && (
            <div className='project-experienceRequired'>
              <b>Year of experience required:</b> {project.experienceRequired}
            </div>
          )}

          {project.description && (
            <Fragment>
              <h4>Description: </h4>
              <div className='project-description long-text'>
                {project.description}
              </div>
            </Fragment>
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
                  // loadUser();
                }}
              />
            ))}
          {!auth.loading && auth.type === 'expert' && (
            <div className='popup-wrapper'>
              <Popup
                trigger={
                  <button className='btn btn-primary'>
                    Refer your friends
                  </button>
                }
                position='center center'
              >
                <div className='share-window'>
                  <input
                    type='text'
                    ref={linkRef}
                    id='share-content'
                    readOnly
                    value={window.location.href}
                  />
                  <ul className='share-option'>
                    <li
                      className='share-option-web'
                      onClick={() => {
                        linkRef.current.select();
                        document.execCommand('copy');
                      }}
                    >
                      <div className='share-icon'>
                        <i class='fas fa-code'></i>
                      </div>

                      <div className='share-text'>Copy</div>
                    </li>
                    <li className='share-option-facebook'>
                      <a
                        href={`http://www.facebook.com/dialog/send?app_id=1620946568102414&link=http://www.nytimes.com/interactive/2015/04/15/travel/europe-favorite-streets.html&redirect_uri=${window.location.href}`}
                      >
                        <div className='share-icon'>
                          <i class='fab fa-facebook-f'></i>
                        </div>

                        <div className='share-text'>Send</div>
                      </a>
                    </li>
                  </ul>
                </div>
              </Popup>
            </div>
          )}
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

const mapStatetoProps = (state) => ({
  auth: state.auth,
  project: state.project.project,
  loading: state.project.loading,
});
export default connect(mapStatetoProps, {
  getProjectById,
  deleteProject,
  applyProject,
  resetProject,
  // loadUser,
})(withRouter(SingleProject));
