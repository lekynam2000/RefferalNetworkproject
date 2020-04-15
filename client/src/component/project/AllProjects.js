import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  getAllProject,
  deleteProject,
  getMultipleProject,
  getMyProject,
} from '../../actions/project';
import { Link, withRouter } from 'react-router-dom';

function AllProject({
  auth,
  projects,
  loading,
  getAllProject,
  getMultipleProject,
  getMyProject,
  location,
}) {
  useEffect(() => {
    // console.log(location.pathname);
    if (location.pathname === '/myproject') {
      getMyProject();
    } else if (location.pathname === '/applied-project') {
      getMultipleProject(auth.application);
    } else {
      getAllProject();
    }
  }, [getAllProject, getMultipleProject, getAllProject, location]);
  const pathname = location.pathname;
  return (
    <Fragment>
      {location.pathname === '/myproject' && (
        <Link to='create-project' className='btn btn-primary'>
          Create new Project
        </Link>
      )}
      <div className='project-list'>
        {!loading &&
          projects.length > 0 &&
          projects.map((project) => {
            let {
              _id,
              title,
              fieldofexpert,
              skills,
              location,
              experienceRequired,
              description,
            } = project;

            return (
              <div key={_id} className='project-item p-2'>
                <div className='project-item-basic'>
                  {title && <h3 className='project-item-title'>{title}</h3>}
                  {location && (
                    <div className='project-item-location'>{location}</div>
                  )}
                </div>
                <div className='project-item-require'>
                  {fieldofexpert && (
                    <div className='project-item-fieldofexpert'>
                      <b>Field of Expert:</b> {fieldofexpert}
                    </div>
                  )}
                  <div className='project-item-year'>
                    <b>Experience Required: </b>
                    {experienceRequired}
                  </div>
                </div>

                {skills && (
                  <ul className='project-item-skills'>
                    <Fragment>
                      {skills.map((skill, id) => (
                        <li key={id} className='project-item-skills-element'>
                          {skill}
                        </li>
                      ))}
                    </Fragment>
                  </ul>
                )}
                {description && (
                  <>
                    <div className='project-item-description long-text'>
                      {description}
                    </div>
                    <Link
                      to={`${
                        pathname === '/myproject' ? 'applicants' : 'view'
                      }/${_id}`}
                    >
                      View more
                    </Link>
                  </>
                )}

                {!auth.loading && auth.type === 'admin' && (
                  <Link
                    className='btn btn-primary'
                    to={`/approve-applicants/${_id}`}
                  >
                    {' '}
                    View applicants
                  </Link>
                )}
              </div>
            );
          })}
      </div>
    </Fragment>
  );
}
const mapStatetoProps = (state) => ({
  auth: state.auth,
  projects: state.project.projects,
  loading: state.project.loading,
});
export default connect(mapStatetoProps, {
  getAllProject,
  deleteProject,
  getMultipleProject,
  getMyProject,
})(withRouter(AllProject));
