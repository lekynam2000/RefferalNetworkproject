import React from 'react';

const ProfileTop = ({
  profile: {
    status,
    resume_file,
    company,
    location,
    website,
    social,
    hourly_input_rate,
    user: { _id, name, avatar, email, type }
  },
  downloadResume
}) => {
  return (
    <div className='profile-top bg-primary p-2'>
      <img className='round-img my-1' src={avatar} alt='' />
      <h1 className='large'>{name}</h1>
      <h2>Role:{type}</h2>
      {type === 'expert' && <h2>Hourly Input Rate: {hourly_input_rate} $</h2>}
      {resume_file && (
        <button
          className='btn btn-danger'
          onClick={() => {
            downloadResume(_id, name);
          }}
        >
          Download Resume
        </button>
      )}
      <h2>{email}</h2>
      <p className='lead'>
        {status} {company ? <span> at {company}</span> : ''}
      </p>
      <p>{location}</p>
      <div className='icons my-1'>
        {website && (
          <a href={website} target='_blank' rel='noopener noreferrer'>
            <i className='fas fa-globe fa-2x'></i>
          </a>
        )}
        {social && social.twitter && (
          <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-twitter fa-2x'></i>
          </a>
        )}

        {social && social.facebook && (
          <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-facebook fa-2x'></i>
          </a>
        )}

        {social && social.linkedin && (
          <a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-linkedin fa-2x'></i>
          </a>
        )}
      </div>
    </div>
  );
};
export default ProfileTop;
