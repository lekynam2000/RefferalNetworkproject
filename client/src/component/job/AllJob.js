import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllJob, deleteJob } from '../../actions/job';
function AllJob({ auth, jobs, loading, getAllJob, deleteJob }) {
  useEffect(() => {
    getAllJob();
  }, [getAllJob]);
  return (
    <div className='job-list'>
      {!loading &&
        jobs.length > 0 &&
        jobs.map((job, index) => {
          let {
            _id,
            title,
            company_id,
            company_name,
            role,
            salary,
            location,
            type,
            referral_fee,
            description
          } = job;
          let { unit, value } = JSON.parse(salary);
          return (
            <div key={index} className='job-item'>
              <div className='job-item-title'>
                {title} at {company_name}
              </div>

              {role && <div className='job-item-role'>{role}</div>}
              {salary && (
                <div className='job-item-salary'>
                  {value} {unit}
                </div>
              )}

              {location && <div className='job-item-location'>{location}</div>}
              {type && <div className='job-item-type'>{type}</div>}
              {referral_fee && (
                <div className='job-item-referral_fee'>{referral_fee}</div>
              )}
              {description && (
                <div className='job-item-description'>{description}</div>
              )}
              {!auth.loading && auth.type == 'admin' && (
                <button
                  className='btn btn-danger'
                  onClick={() => {
                    deleteJob(_id);
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          );
        })}
    </div>
  );
}
const mapStatetoProps = state => ({
  auth: state.auth,
  jobs: state.job.jobs,
  loading: state.job.loading
});
export default connect(mapStatetoProps, { getAllJob, deleteJob })(AllJob);
