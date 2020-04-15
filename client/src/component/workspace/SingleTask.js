import React, { useState } from 'react';

import { connect } from 'react-redux';
import { addDiscussion, addSolution } from '../../actions/workspace';
function SingleTask({ task, workspace_id, name, addDiscussion, addSolution }) {
  const [solution, setSolution] = useState('');
  const [discussion, setDiscussion] = useState('');

  const submitSolution = () => {
    addSolution(solution, workspace_id, task._id);
    setSolution('');
  };
  const submitDiscussion = () => {
    addDiscussion(discussion, workspace_id, task._id);
    setDiscussion('');
  };
  return (
    <li className='single-task' key={task._id}>
      <h3>Task:</h3>
      <p className='problem'>{task.problem}</p>
      <h4>Solution:</h4>
      {task.solution ? (
        <p className='solution'>{task.solution}</p>
      ) : (
        <>
          <textarea
            value={solution}
            onChange={(e) => {
              setSolution(e.target.value);
            }}
          />
          <button
            className='btn btn-primary'
            onClick={() => {
              submitSolution();
            }}
          >
            Submit
          </button>
        </>
      )}
      <ul className='discussions'>
        {task.discussion.map((dis) => (
          <li className='discussion-item' key={dis._id}>
            <b>{name[dis.user_type]}</b>: {dis.content}
          </li>
        ))}
      </ul>
      <input
        type='text'
        onChange={(e) => setDiscussion(e.target.value)}
        value={discussion}
      />
      <button
        className='btn btn-primary'
        onClick={() => {
          submitDiscussion();
        }}
      >
        Add
      </button>
    </li>
  );
}
// const mapStatetoProps = (state) => ({
//   auth: state.auth,
// });
export default connect(null, { addDiscussion, addSolution })(SingleTask);
