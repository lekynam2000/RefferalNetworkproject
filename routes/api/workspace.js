const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Workspace = require('../../models/Workspace');
const Project = require('../../models/Project');
// @route GET api/workspace
// @desc get workspace by query parameters
// @access Private

router.get('/', auth, async (req, res) => {
  // console.log('done');
  try {
    const workspace = await Workspace.findById(req.query.id)
      .populate('project', ['title'])
      .populate('client', ['email', 'name'])
      .populate('expert', ['email', 'name']);
    if (
      req.user.id === workspace.client._id.toString() ||
      req.user.id === workspace.expert._id.toString()
    ) {
      res.json(workspace);
    } else {
      res.status(400).send('User Denied');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route GET api/workspace/me
// @desc get own workspace
// @access Private

router.get('/me', auth, async (req, res) => {
  // console.log('done');
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).send('Not found user');
    }
    const type = user.type;
    const workspaces = await Workspace.find({
      [type]: user.id,
    })
      .populate('project', ['title'])
      .populate('client', ['name'])
      .populate('expert', ['name']);
    res.json(workspaces);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route POST api/workspace
// @desc create new workspace
// @access Private
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.id !== req.body.client) {
      return res.status(400).send('User Denied');
    }
    const project = await Project.findById(req.body.project);

    if (!project) {
      return res.status(401).send('Bad Request');
    }
    if (req.user.id !== project.client.toString()) {
      return res.status(400).send('User Denied');
    }
    const workspace = new Workspace({
      client: req.body.client,
      expert: req.body.expert,
      project: req.body.project,
    });
    const currApplication = project.application.filter(
      (app) => app.user.toString() === req.body.expert
    );
    if (currApplication.length === 0) {
      return res.status(401).send('Bad request');
    }

    currApplication[0].workspace = workspace._id;
    await project.save();
    await workspace.save();

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route PUT api/workspace/:id/task
// @desc add new task to workspace
// @access Private
router.put('/:id/task', auth, async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id)
      .populate('project', ['title'])
      .populate('client', ['email', 'name'])
      .populate('expert', ['email', 'name']);

    if (!workspace) {
      return res.status(401).send('Bad Request');
    }
    if (req.user.id !== workspace.client._id.toString()) {
      return res.status(400).send('User Denied');
    }
    workspace.tasks.unshift({ problem: req.body.problem });
    await workspace.save();
    res.json(workspace);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route PUT api/workspace/:id/task/:task_id/solution
// @desc write solution for task
// @access Private
router.put('/:id/task/:task_id/solution', auth, async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id)
      .populate('project', ['title'])
      .populate('client', ['email', 'name'])
      .populate('expert', ['email', 'name']);
    if (!workspace) {
      return res.status(401).send('Bad Request');
    }
    if (req.user.id !== workspace.expert._id.toString()) {
      return res.status(400).send('User Denied');
    }
    const taskA = workspace.tasks.filter(
      (t) => t._id.toString() === req.params.task_id
    );

    if (taskA.length === 0) return res.status(401).send('Bad Request');
    taskA[0].solution = req.body.solution;

    await workspace.save();
    res.json(workspace);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
// @route PUT api/workspace/:id/task/:task_id/discussion
// @desc add discussion to the task
// @access Private
router.put('/:id/task/:task_id/discussion', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).send('User Denied');
    }

    const workspace = await Workspace.findById(req.params.id)
      .populate('project', ['title'])
      .populate('client', ['email', 'name'])
      .populate('expert', ['email', 'name']);
    if (!workspace) {
      return res.status(401).send('Bad Request');
    }
    if (
      req.user.id !== workspace.expert._id.toString() &&
      req.user.id !== workspace.client._id.toString()
    ) {
      return res.status(400).send('User Denied');
    }
    const taskA = workspace.tasks.filter(
      (t) => t._id.toString() === req.params.task_id
    );
    if (taskA.length === 0) return res.status(401).send('Bad Request');
    taskA[0].discussion.push({
      user_type: user.type,
      content: req.body.discussion,
    });

    await workspace.save();
    res.json(workspace);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
