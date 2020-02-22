import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

function Navbar({ auth: { isAuthen, loading }, logout }) {
  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Referers</Link>
      </li>

      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );
  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Referrers</Link>
      </li>
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
            logout();
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
        <Link to='/'>Referal Network</Link>
      </h1>
      {!loading && isAuthen ? authLinks : guestLinks}
    </nav>
  );
}
const mapStatetoProps = state => ({
  auth: state.auth
});

export default connect(mapStatetoProps, { logout })(Navbar);
