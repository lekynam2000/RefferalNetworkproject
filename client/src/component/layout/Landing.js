import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
function Landing({ isAuthen }) {
  if (isAuthen) return <Redirect to='/dashboard' />;
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Referrer Network</h1>
          <p className='lead'>
            A place that help you earn money and search job for your friends
          </p>
          <div className='buttons'>
            <Link to='/profiles' className='btn btn-primary'>
              Our Referers
            </Link>
            <Link to='/jobs' className='btn btn-light'>
              Jobs List
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
const mapStatetoProps = state => ({
  isAuthen: state.auth.isAuthen
});
export default connect(mapStatetoProps)(Landing);
