import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
function Sidebar({ auth: { _id, isAuthen, loading, type, avatar, name } }) {
  return (
    !loading &&
    isAuthen && (
      <nav className='sidebar bg-dark'>
        <ul>
          <li className='sidebar-avatar'>
            <img
              id='sidebar-avatar-image'
              width='200'
              height='200'
              src={avatar}
              alt='User Avatar'
            />
          </li>
          <li>
            <Link to='/dashboard'>{name}</Link>
          </li>
          <li>
            {type && <Link to='/dashboard'>Role:{type.toUpperCase()}</Link>}
          </li>
          <li>
            <Link to='/dashboard'>
              <i className='far fa-address-book'></i>
              <span className='sidebar-text'>Dashboard</span>
            </Link>
          </li>

          {type !== 'admin' && (
            <li>
              <Link to={type === 'client' ? '/myproject' : '/applied-project'}>
                <i className='fas fa-archive'></i>
                <span className='sidebar-text'>
                  {type === 'client' ? 'My Projects' : 'Applied Projects'}
                </span>
              </Link>
            </li>
          )}
          <li>
            <Link to='/profiles'>
              <i className='fas fa-users'></i>
              <span className='sidebar-text'>All Users</span>
            </Link>
          </li>
          <li>
            <Link to='/projects'>
              <i className='fas fa-business-time'></i>
              <span className='sidebar-text'>All Projects</span>
            </Link>
          </li>
        </ul>
      </nav>
    )
  );
}
const mapStatetoProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStatetoProps)(Sidebar);
