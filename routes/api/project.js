const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Project = require('../../models/Project');
const ClientProject = require('../../models/ClientProject');
// @route POST api/project
// @desc create project
// @access Client

router.post(
  '/',
  [
    auth,
    check('title', 'Project title is required')
      .not()
      .isEmpty(),
    check('fieldofexpert', 'Field of expert is required')
      .not()
      .isEmpty(),
    check('description', 'Description is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (user.type == 'expert') {
        res.status(401).json({ errors: [{ msg: 'User is not permitted' }] });
      }

      const newProject = new Project({
        title: req.body.title,
        client: req.user.id,
        fieldofexpert: req.body.fieldofexpert,
        skills: req.body.skills,
        location: req.body.location,
        experienceRequired: req.body.experienceRequired,
        description: req.body.description
      });

      const project = await newProject.save();
      const client = await ClientProject.findOne({ client: req.user.id });
      client.projects.unshift(project._id);
      await client.save();
      res.send(project);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Errors');
    }
  }
);
// @route GET api/project
// @desc get all projects
// @access Public
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ posted_day: -1 });

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
// @route GET api/project/me
// @desc get projects by user
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await ClientProject.findOne({ client: req.user.id });
    const projectList = user.projects;
    const projects = await Project.find({
      _id: { $in: projectList }
    });
    if (!projects) {
      return res.status(400).json({ msg: 'Project not found' });
    }
    res.json(projects);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'project not found' });
    }
    res.status(500).send('Server Error');
  }
});
// @route GET api/project/multiple
// @desc get projects by ID array in body
// @access Public
router.post('/multiple', async (req, res) => {
  try {
    const projects = await Project.find({
      _id: { $in: req.body.projectList }
    }).select('-client');
    if (!projects) {
      return res.status(400).json({ msg: 'Project not found' });
    }
    res.json(projects);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'project not found' });
    }
    res.status(500).send('Server Error');
  }
});
// @route GET api/project/:id
// @desc get project by Id
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(400).json({ msg: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'project not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route GET api/project/application/:id
// @desc get all applicant of project by Id
// @access Private Client
router.get('/application/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    if (
      !user ||
      user.type !== 'client' ||
      req.user.id !== project.client.toString()
    ) {
      return res.status(400).json({ msg: 'User unauthorized' });
    }

    const userList = project.application.map(app => app.user);

    const info = await Profile.find(
      { user: { $in: userList } },
      { user: 1, location: 1, skills: 1, experience: 1 }
    );
    res.json(info);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'project not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route PUT api/project/accept/:id/user/:user_id
// @desc accept project by Id
// @access Private Client
router.put('/accept/:id/user/:user_id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    if (
      !user ||
      user.type !== 'client' ||
      req.user.id !== project.client.toString()
    ) {
      return res.status(400).json({ msg: 'User unauthorized' });
    }

    const currentApplication = project.application.filter(
      app => app.user.toString() === req.params.user_id
    )[0];
    currentApplication.accepted = true;
    await project.save();
    const applicant = await User.findById(currentApplication.user).select(
      'application'
    );
    const acceptedApplication = applicant.application.filter(
      app => app.project.toString() === req.params.id
    )[0];
    acceptedApplication.accepted = true;
    await applicant.save();
    res.json(project);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'project not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/project/:id
// @desc delete project by Id
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    const clientproject = await ClientProject.findOne({ client: req.user.id });

    if (!clientproject) {
      return res.status(400).json({ msg: 'Client not found' });
    }
    if (!project) {
      return res.status(400).json({ msg: 'Project not found' });
    }
    if (project.client.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User is not authorized' });
    }
    await project.remove();
    const projects = await Project.find();
    clientproject.projects = clientproject.projects.filter(
      project => project !== req.params.id
    );
    clientproject.save();
    res.json(projects);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Project not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route PUT api/project/apply
// @desc apply project
// @access Private Expert

router.put('/apply', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user || user.type !== 'expert') {
      return res.status(400).json({ msg: 'User not authorized' });
    }
    const project = await Project.findById(req.body.project);
    if (!project) {
      return res.status(404).json({ msg: 'Not Found' });
    }
    const isApplied = user.application.filter(
      p => req.body.project === p.user.toString()
    );
    if (isApplied.length > 0) {
      return res.status(401).json({ msg: 'Bad Request' });
    }
    user.application.unshift({ project: project._id });
    await user.save();
    project.application.unshift({ user: req.user.id });
    await project.save();
    res.json(user.application);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Errors');
  }
});

// @route PUT api/project
// @desc update project by Id
// @access Private Client
router.put(
  '/:id',
  [
    auth,
    check('title', 'Project title is required')
      .not()
      .isEmpty(),
    check('fieldofexpert', 'Field of expert is required')
      .not()
      .isEmpty(),
    check('description', 'Description is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      const project = await Project.findOne({ _id: req.params.id });
      if (user.type == 'expert' || project.client.toString() !== req.user.id) {
        res.status(401).json({ errors: [{ msg: 'User is not permitted' }] });
      }

      const newProject = {
        title: req.body.title,
        fieldofexpert: req.body.fieldofexpert,
        skills: req.body.skills,
        location: req.body.location,
        experienceRequired: req.body.experienceRequired,
        description: req.body.description
      };
      const copy = JSON.parse(JSON.stringify(project));
      copy.history = null;
      for (let property in newProject) {
        project[property] = newProject[property];
        project['posted_day'] = Date.now();
      }

      project.history.unshift({
        status: JSON.stringify(copy),
        time: project.posted_day
      });
      await project.save();
      res.send(project);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Errors');
    }
  }
);

module.exports = router;
