const express = require('express');
const router = express.Router();
const Company = require('../../models/Company');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Job = require('../../models/Job');

// @route POST api/job
// @desc create job
// @access Private

router.post(
  '/',
  [
    auth,
    check('title', 'Job title is required')
      .not()
      .isEmpty(),
    check('company_id', 'Company is required')
      .not()
      .isEmpty(),
    check('role', 'Role is required')
      .not()
      .isEmpty(),
    check('location', 'Job location is required')
      .not()
      .isEmpty(),
    check('type', 'Job type is required')
      .not()
      .isEmpty(),
    check('description', 'Job description is required')
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
      if (user.type !== 'admin') {
        res.status(401).json({ errors: [{ msg: 'User is not permitted' }] });
      }
      var company = await Company.findById(req.body.company_id);
      if (!company) {
        return res
          .status(401)
          .json({ errors: [{ msg: 'Company does not exist' }] });
      }
      var newJob = new Job({
        title: req.body.title,
        company_id: req.body.company_id,
        company_name: company.name,
        role: req.body.role,
        salary: JSON.stringify(req.body.salary),
        location: req.body.location,
        type: req.body.type,
        expired: req.body.expired,
        referral_fee: req.body.referral_fee,
        description: req.body.description,
        requirements: req.body.requirements
      });

      var job = await newJob.save();
      res.send(job);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Errors');
    }
  }
);
// @route GET api/job
// @desc get all jobs
// @access Public
router.get('/', async (req, res) => {
  try {
    var jobs = await Job.find().sort({ posted_day: -1 });

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// @route GET api/job/:id
// @desc get job by Id
// @access Public
router.get('/:id', async (req, res) => {
  try {
    var job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(400).json({ msg: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'job not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/job/:id
// @desc delete job by Id
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    var job = await Job.findById(req.params.id);
    var user = await User.findById(req.user.id);
    if (!job) {
      return res.status(400).json({ msg: 'Job not found' });
    }
    if (user.type !== 'admin') {
      return res.status(401).json({ msg: 'User is not authorized' });
    }
    await job.remove();
    var jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Job not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route PUT api/job/:id
// @desc update job by Id
// @access Private Admin
router.put(
  '/:id',
  [
    auth,
    check('title', 'Job title is required')
      .not()
      .isEmpty(),
    check('company_id', 'Company is required')
      .not()
      .isEmpty(),
    check('role', 'Role is required')
      .not()
      .isEmpty(),
    check('location', 'Job location is required')
      .not()
      .isEmpty(),
    check('type', 'Job type is required')
      .not()
      .isEmpty(),
    check('description', 'Job description is required')
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
      if (user.type !== 'admin') {
        res.status(401).json({ errors: [{ msg: 'User is not permitted' }] });
      }
      var company = await Company.findById(req.body.company_id);
      if (!company) {
        return res
          .status(401)
          .json({ errors: [{ msg: 'Company does not exist' }] });
      }
      var job = await Job.findById(req.params.id);
      if (!job) {
        return res.status(401).json({ errors: [{ msg: 'Job not found' }] });
      }
      var newJob = new Job({
        title: req.body.title,
        company_id: req.body.company_id,
        company_name: company.name,
        role: req.body.role,
        salary: JSON.stringify(req.body.salary),
        location: req.body.location,
        type: req.body.type,
        expired: req.body.expired,
        referral_fee: req.body.referral_fee,
        description: req.body.description,
        requirements: req.body.requirements
      });
      for (let property in job) {
        job[property] = newJob[property];
      }
      await job.save();
      res.json(job);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Errors');
    }
  }
);

module.exports = router;
