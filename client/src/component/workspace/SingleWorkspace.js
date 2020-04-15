import React, { useState, useEffect, Fragment } from 'react';
import SingleTask from './SingleTask';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getWorkspace, resetWorkspace, addTask } from '../../actions/workspace';
function SingleWorkspace({
  loading,
  workspace,
  getWorkspace,
  resetWorkspace,
  addTask,
  match,
  auth,
}) {
  const [problem, setProblem] = useState('');
  useEffect(() => {
    resetWorkspace();
    getWorkspace(match.params.id);
  }, [resetWorkspace, getWorkspace]);
  const name = {
    client: workspace ? workspace.client.name : 'loading',
    expert: workspace ? workspace.expert.name : 'loading',
  };
  const submitTask = (workspace) => {
    addTask(problem, workspace);
    setProblem('');
  };
  return (
    !loading &&
    workspace && (
      <div className='workspace'>
        <div className='project-title'>{workspace.project.title}</div>
        <div className='client-email'>Client: {workspace.client.email}</div>
        <div className='expert-email'>Expert: {workspace.expert.email}</div>
        <ul className='tasks'>
          {workspace.tasks.map((task) => (
            <SingleTask task={task} workspace_id={workspace._id} name={name} />
          ))}
        </ul>
        {auth && auth.type === 'client' && (
          <Fragment>
            <textarea
              cols='30'
              rows='10'
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
            ></textarea>
            <button
              className='btn btn-primary'
              onClick={() => submitTask(workspace._id)}
            >
              Add Problem
            </button>
          </Fragment>
        )}
      </div>
    )
  );
}
const mapStatetoProps = (state) => ({
  workspace: state.workspace.workspace,
  loading: state.workspace.loading,
  auth: state.auth,
});
export default connect(mapStatetoProps, {
  getWorkspace,
  resetWorkspace,
  addTask,
})(withRouter(SingleWorkspace));
