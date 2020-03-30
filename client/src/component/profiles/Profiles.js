import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProfiles, getProfilebyField } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

const Profiles = ({
  getAllProfiles,
  getProfilebyField,
  profile: { profiles, loading }
}) => {
  const [field, setField] = useState('all');
  const [arg, setArg] = useState();

  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);

  const onChangeField = e => {
    setField(e.target.value);
  };
  const onChangeValue = e => {
    setArg(e.target.value);
  };
  const onSubmit = () => {
    if (field === 'all') getAllProfiles();
    else getProfilebyField(field, arg);
  };
  return (
    <Fragment>
      <div className='form-group'>
        <label for='field'>Search field: </label>
        <select id='field' value={field} onChange={e => onChangeField(e)}>
          <option value='all'>All</option>
          <option value='name'>Name</option>
          <option value='skills'>Skill</option>
          <option value='bio'>Summary</option>
          <option value='experience'>Work Experience</option>
        </select>{' '}
        <label for='search'> Value: </label>
        <input
          type='text'
          id='search'
          value={arg}
          onChange={e => onChangeValue(e)}
        />{' '}
        <div className='btn btn-primary' onClick={() => onSubmit()}>
          Search
        </div>
      </div>{' '}
      {loading ? (
        <Spinner />
      ) : (
        profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ))
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getAllProfiles: PropTypes.func.isRequired
};
const mapStatetoProps = state => ({
  profile: state.profile
});

export default connect(mapStatetoProps, { getAllProfiles, getProfilebyField })(
  Profiles
);
