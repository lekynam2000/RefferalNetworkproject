import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
function Sidebar({ auth: { isAuthen, loading } }) {
  return (
    !loading &&
    isAuthen && (
      <nav className='sidebar bg-dark'>
        <ul>
          <li>
            <Link to='/dashboard'>
              <i className='far fa-address-book'></i>
            </Link>
          </li>
          <li>
            <Link to='/profiles'>
              <i className='fas fa-users'></i>
            </Link>
          </li>
          <li>
            <Link to='/projects'>
              <i className='fas fa-business-time'></i>
            </Link>
          </li>
        </ul>
      </nav>
    )
  );
}
const mapStatetoProps = state => ({
  auth: state.auth
});
export default connect(mapStatetoProps)(Sidebar);
