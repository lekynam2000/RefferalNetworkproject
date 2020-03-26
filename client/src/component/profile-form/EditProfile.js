import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createProfile,
  getCurrentProfile,
  uploadResume,
  downloadResume
} from '../../actions/profile';

const initialState = {
  user: '',
  company: '',
  website: '',
  location: '',
  status: '',
  skills: '',
  resume_file: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: ''
};

const EditProfile = ({
  auth,
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  uploadResume,
  downloadResume,
  history
}) => {
  const [formData, setFormData] = useState(initialState);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData && key !== 'skills')
          profileData[key] = profile[key];
        if (key === 'skills') profileData['skills'] = profile.skills.join(',');
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    user,
    company,
    website,
    location,
    status,
    skills,
    resume_file,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onChangeFile = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = e => {
    e.preventDefault();
    const fileForm = new FormData();
    fileForm.append('file', file);
    console.log(fileForm);
    console.log(file);
    uploadResume(fileForm);
    createProfile(formData, history, true);
  };

  return (
    !loading &&
    (profile ? (
      <Fragment>
        <h1 className='large text-primary'>Edit Your Profile</h1>
        <p className='lead'>
          <i className='fas fa-user' /> Add some changes to your profile
        </p>
        <small>* = required field</small>
        <form className='form' onSubmit={onSubmit}>
          <div className='form-group'>
            <select name='status' value={status} onChange={onChange}>
              <option>* Select Professional Status</option>
              <option value='Junior'>Junior </option>
              <option value='Senior '>Senior </option>
              <option value='Manager'>Manager</option>
              <option value='Student or Learning'>Student or Learning</option>
              <option value='Instructor'>Instructor or Teacher</option>
              <option value='Intern'>Intern</option>
              <option value='Other'>Other</option>
            </select>
            <small className='form-text'>
              Give us an idea of where you are at in your career
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Company'
              name='company'
              value={company}
              onChange={onChange}
            />
            <small className='form-text'>
              Could be your own company or one you work for
            </small>
          </div>
          {resume_file && (
            <div
              className='btn btn-danger'
              onClick={() => {
                downloadResume(user._id, auth.name);
              }}
            >
              Resume
            </div>
          )}
          <div className='form-group'>
            <input
              type='file'
              className='custom-file-input'
              id='customFile'
              onChange={e => onChangeFile(e)}
            />{' '}
            <label className='custom-file-label' htmlFor='customFile'>
              {filename}
            </label>
            <small className='form-text'>Update your resume </small>{' '}
          </div>{' '}
          <div className='form-group'>
            <input
              type='text'
              placeholder='Website'
              name='website'
              value={website}
              onChange={onChange}
            />
            <small className='form-text'>
              Could be your own or a company website
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Location'
              name='location'
              value={location}
              onChange={onChange}
            />
            <small className='form-text'>
              City & state suggested (eg. Boston, MA)
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Skills'
              name='skills'
              value={skills}
              onChange={onChange}
            />
            <small className='form-text'>
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
          </div>
          <div className='form-group'>
            <textarea
              placeholder='A short bio of yourself'
              name='bio'
              value={bio}
              onChange={onChange}
            />
            <small className='form-text'>Tell us a little about yourself</small>
          </div>
          <div className='my-2'>
            <button
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
              type='button'
              className='btn btn-light'
            >
              Add Social Network Links
            </button>
            <span>Optional</span>
          </div>
          {displaySocialInputs && (
            <Fragment>
              <div className='form-group social-input'>
                <i className='fab fa-twitter fa-2x' />
                <input
                  type='text'
                  placeholder='Twitter URL'
                  name='twitter'
                  value={twitter}
                  onChange={onChange}
                />
              </div>

              <div className='form-group social-input'>
                <i className='fab fa-facebook fa-2x' />
                <input
                  type='text'
                  placeholder='Facebook URL'
                  name='facebook'
                  value={facebook}
                  onChange={onChange}
                />
              </div>

              <div className='form-group social-input'>
                <i className='fab fa-youtube fa-2x' />
                <input
                  type='text'
                  placeholder='YouTube URL'
                  name='youtube'
                  value={youtube}
                  onChange={onChange}
                />
              </div>

              <div className='form-group social-input'>
                <i className='fab fa-linkedin fa-2x' />
                <input
                  type='text'
                  placeholder='Linkedin URL'
                  name='linkedin'
                  value={linkedin}
                  onChange={onChange}
                />
              </div>

              <div className='form-group social-input'>
                <i className='fab fa-instagram fa-2x' />
                <input
                  type='text'
                  placeholder='Instagram URL'
                  name='instagram'
                  value={instagram}
                  onChange={onChange}
                />
              </div>
            </Fragment>
          )}
          <input type='submit' className='btn btn-primary my-1' />
          <Link className='btn btn-light my-1' to='/dashboard'>
            Go Back
          </Link>
        </form>
      </Fragment>
    ) : (
      <Redirect to='/dashboard' />
    ))
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  uploadResume: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
  uploadResume,
  downloadResume
})(withRouter(EditProfile));
