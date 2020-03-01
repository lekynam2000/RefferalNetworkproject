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
            <Link to='/register/client' className='btn btn-primary'>
              Become a Client
            </Link>
            <Link to='/register' className='btn btn-light'>
              Become an Expert
            </Link>
            <div className='question'>Already have account?</div>
            <Link to='/login' className='btn btn-light'>
              Login
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
