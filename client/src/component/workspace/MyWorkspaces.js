import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMyWorkspace, resetWorkspace } from '../../actions/workspace';
import { useEffect } from 'react';

function MyWorkspaces({ loading, workspaces, getMyWorkspace }) {
  useEffect(() => {
    resetWorkspace();
    getMyWorkspace();
  });
  return (
    !loading && (
      <ul className='workspace-list'>
        {workspaces.map((workspace) => (
          <li className='workspace-item' key={workspace._id}>
            <Link to={`/workspace/single/${workspace._id}`}>
              <h3>{workspace.project.title}</h3>
            </Link>

            <p>
              <b>Client: </b>
              {workspace.client.name}
            </p>
            <p>
              <b>Expert: </b>
              {workspace.expert.name}
            </p>
          </li>
        ))}
      </ul>
    )
  );
}
const mapStatetoProps = (state) => ({
  workspaces: state.workspace.workspaces,
  loading: state.workspace.loading,
});
export default connect(mapStatetoProps, { getMyWorkspace, resetWorkspace })(
  MyWorkspaces
);
