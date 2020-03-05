import React, { Fragment, useEffect } from 'react';
import SingleProject from './SingleProject';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getApplicantProfile, resetProfile } from '../../actions/profile';
import { approveApplication, resetProject } from '../../actions/project';
import PropTypes from 'prop-types';

function Applicants({
  profile: { profiles, loading },
  project,
  getApplicantProfile,
  approveApplication,
  resetProfile,
  match
}) {
  useEffect(() => {
    resetProfile();
    resetProject();
    getApplicantProfile(match.params.id);
  }, [resetProfile, getApplicantProfile, match.params.id]);
  return (
    <Fragment>
      <SingleProject></SingleProject>
      <h1>Applicants</h1>
      <table className='applicants-list'>
        <thead>
          <tr>
            <th>Index</th>
            <th>Location</th>
            <th>Skill</th>
            <th>Experience</th>
            <th>Approval</th>
          </tr>
        </thead>

        <tbody>
          {!loading &&
            profiles.length > 0 &&
            profiles.map(
              (profile, index) =>
                profile && (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{profile.location}</td>
                    <td>
                      <ul>
                        {profile.skills &&
                          profile.skills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                          ))}
                      </ul>
                    </td>
                    <td>
                      <ul>
                        {profile.experience &&
                          profile.experience.map((exp, index) => (
                            <li key={index}>
                              <p>{exp.title}</p>
                              <p>{exp.company}</p>
                              <p>{exp.location}</p>
                            </li>
                          ))}
                      </ul>
                    </td>
                    <td>
                      {!project.loading &&
                        project.project.application.filter(
                          app => app.user === profile.user
                        )[0] &&
                        (project.project.application.filter(
                          app => app.user === profile.user
                        )[0].approved ? (
                          <div className='btn btn-light'>Approved</div>
                        ) : (
                          <button
                            className='btn btn-primary'
                            onClick={() => {
                              approveApplication(match.params.id, profile.user);
                            }}
                          >
                            Approve
                          </button>
                        ))}
                    </td>
                  </tr>
                )
            )}
        </tbody>
      </table>
    </Fragment>
  );
}

Applicants.propTypes = {
  profile: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  resetProfile: PropTypes.func.isRequired,
  approveApplication: PropTypes.func.isRequired,
  getApplicantProfile: PropTypes.func.isRequired
};
const mapStatetoProps = state => ({
  profile: state.profile,
  project: state.project
});

export default connect(mapStatetoProps, {
  resetProfile,
  resetProject,
  getApplicantProfile,
  approveApplication
})(withRouter(Applicants));