import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getAllProject, deleteProject } from '../../actions/project';
import { Link } from 'react-router-dom';
function AllProject({ auth, projects, loading, getAllProject, deleteProject }) {
  useEffect(() => {
    getAllProject();
  }, [getAllProject]);
  return (
    <div className='project-list'>
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
                    {skills.map(skill => (
                      <li>{skill}</li>
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
              {!auth.loading && auth.type === 'admin' && (
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
              )}
            </div>
          );
        })}
    </div>
  );
}
const mapStatetoProps = state => ({
  auth: state.auth,
  projects: state.project.projects,
  loading: state.project.loading
});
export default connect(mapStatetoProps, { getAllProject, deleteProject })(
  AllProject
);
