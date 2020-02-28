const express = require('express');
const router = express.Router();

const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Project = require('../../models/Project');

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
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    try {
      var user = await User.findById(req.user.id).select('-password');
      if (user.type == 'expert') {
        res.status(401).json({ errors: [{ msg: 'User is not permitted' }] });
      }

      var newProject = new Project({
        title: req.body.title,
        fieldofexpert: req.body.fieldofexpert,
        skills: req.body.skills,
        location: req.body.location,
        experienceRequired: req.body.experienceRequired,
        description: req.body.description
      });

      var project = await newProject.save();
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
    var projects = await Project.find().sort({ posted_day: -1 });

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// @route GET api/project/:id
// @desc get project by Id
// @access Public
router.get('/:id', async (req, res) => {
  try {
    var project = await Project.findById(req.params.id);
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

// @route DELETE api/project/:id
// @desc delete project by Id
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    var project = await Project.findById(req.params.id);
    var user = await User.findById(req.user.id);
    if (!project) {
      return res.status(400).json({ msg: 'Project not found' });
    }
    if (user.type !== 'admin') {
      return res.status(401).json({ msg: 'User is not authorized' });
    }
    await project.remove();
    var projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Project not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route PUT api/project/:id
// @desc update project by Id
// @access Private Admin
router.put(
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
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    try {
      var user = await User.findById(req.user.id).select('-password');
      if (user.type == 'expert') {
        res.status(401).json({ errors: [{ msg: 'User is not permitted' }] });
      }

      var newProject = new Project({
        title: req.body.title,
        fieldofexpert: req.body.fieldofexpert,
        skills: req.body.skills,
        location: req.body.location,
        experienceRequired: req.body.experienceRequired,
        description: req.body.description
      });

      const project = await Project.findOndAndUpdate(
        { _id: req.body.id },
        { $set: newProject }
      );

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
    var projects = await Project.find().sort({ posted_day: -1 });

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
