import React, { Fragment } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

function Navbar({ auth: { isAuthen, loading, type }, logout, history }) {
  const guestLinks = (
    <ul>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );
  const authLinks = (
    <ul>
      {type === 'admin' && (
        <Fragment>
          <li>
            <Link to='/create-project'>
              <i className='fas fa-business-time'></i>{' '}
              <span className='hide-sm'>Add Project</span>
            </Link>
          </li>
          <li></li>
        </Fragment>
      )}

      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user'></i>{' '}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <a
          href='#!'
          onClick={() => {
            logout(history);
            return <Redirect to='/login'></Redirect>;
          }}
        >
          <i className='fas fa-sign-out-alt'></i>
          <span className='hide-sm'>Log out</span>
        </a>
      </li>
    </ul>
  );
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>Cap8sia</Link>
      </h1>
      {!loading && isAuthen ? authLinks : guestLinks}
    </nav>
  );
}
const mapStatetoProps = state => ({
  auth: state.auth
});

export default connect(mapStatetoProps, { logout })(withRouter(Navbar));
