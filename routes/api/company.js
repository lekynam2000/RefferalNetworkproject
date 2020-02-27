const express = require('express');
const router = express.Router();
const Company = require('../../models/Company');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

// @route POST api/company
// @desc create company
// @access Private

router.post(
  '/',
  [
    auth,
    check('name', 'Company name is required')
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

      var newCompany = new Company({
        name: req.body.name,
        avatar: req.body.avatar,
        contact: JSON.stringify(req.body.contact),
        description: req.body.description,
        benefit: req.body.benefit,
        culture: req.body.culture,
        photo: req.body.photo
      });
      var company = await newCompany.save();
      res.send(company);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Errors');
    }
  }
);
// @route GET api/company
// @desc get all company
// @access Public
router.get('/', async (req, res) => {
  try {
    var companies = await Company.find();
    res.json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// @route GET api/company/:id
// @desc get company by Id
// @access Public
router.get('/:id', async (req, res) => {
  try {
    var company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ msg: 'Company not found' });
    }
    res.json(company);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Company not found' });
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
    check('name', 'Company name is required')
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
      var company = await Company.findById(req.params.id);
      if (!company) {
        return res
          .status(401)
          .json({ errors: [{ msg: 'Company does not exist' }] });
      }

      var newCompany = {
        name: req.body.name,
        avatar: req.body.avatar,
        contact: JSON.stringify(req.body.contact),
        description: req.body.description,
        benefit: req.body.benefit,
        culture: req.body.culture,
        photo: req.body.photo
      };
      company = await newCompany.save();
      res.json(company);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Errors');
    }
  }
);

module.exports = router;
