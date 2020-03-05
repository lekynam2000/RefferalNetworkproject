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
          let { _id, title, fieldofexpert, skills, location } = project;

          return (
            <div key={_id} className='project-item'>
              {title && <h3 className='project-item-title'>{title}</h3>}
              {fieldofexpert && (
                <div className='project-item-fieldofexpert'>
                  Field of Expert: {fieldofexpert}
                </div>
              )}
              {skills && (
                <ul className='project-item-skills'>
                  <Fragment>
                    <h4 className='project-item-skills-header'>
                      Required Skill:
                    </h4>
                    {skills.map(skill => (
                      <li className='project-item-skills-element'>{skill}</li>
                    ))}
                  </Fragment>
                </ul>
              )}
              {location && (
                <div className='project-item-location'>
                  Location: {location}
                </div>
              )}
              <Link to={`view/${_id}`}>View more</Link>
              {!auth.loading && auth.type === 'admin' && (
                <Link to={`/approve-applicants/${_id}`}> View applicants</Link>
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
