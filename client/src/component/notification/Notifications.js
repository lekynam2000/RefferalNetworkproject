import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Notifications({ auth }) {
  useEffect(() => {
    axios.put('/api/user/notifications_seen');
  });
  return (
    !auth.loading &&
    auth.isAuthen && (
      <ul className='notifications-list'>
        {auth.notifications.map((noti) => (
          <li className={`notification${!noti.seen && ' notseen'}`}>
            <Link to={noti.link}>
              <h3>{noti.title}</h3>
              <p>{noti.content}</p>
            </Link>
          </li>
        ))}
      </ul>
    )
  );
}
const mapStatetoProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStatetoProps)(Notifications);
