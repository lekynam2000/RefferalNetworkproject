import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
function Landing({ isAuthen }) {
  if (isAuthen) return <Redirect to='/dashboard' />;
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1>Access Asia-Pacific Markets more</h1>
          <h1>Intelligently</h1>

          <p className='lead'>Power your Decisions with deep APAC insights</p>
          <div className='buttons'>
            <Link to='/register/client' className='btn btn-primary'>
              Become a Client
            </Link>
            <Link to='/register/expert' className='btn btn-light'>
              Become an expert
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
