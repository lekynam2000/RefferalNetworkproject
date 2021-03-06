const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const config = require('config');
const request = require('request');

// @route GET api/profile/me
// @desc get current user profile
// @access Private

router.get('/me', auth, async (req, res) => {
  console.log('done');
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).send('No Profile');
    }
    res.send(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route POST api/profile
// @desc create or update user profile
// @access Private
router.post(
  '/',
  [
    auth,
    check('skills', 'Skills is required')
      .not()
      .isEmpty(),
    check('status', 'Status is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;
    let profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;
    try {
      const profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route GET api/profile
// @desc get all user profile
// @access Public

router.get('/', async (req, res) => {
  try {
    const profileList = await Profile.find().populate('user', [
      'name',
      'avatar'
    ]);
    return res.json(profileList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/profile/user/:user_id
// @desc get user profile
// @access Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/profile/
// @desc delete current user profile
// @access Private

router.delete('/', auth, async (req, res) => {
  try {
    // @todo delete the posts
    await Profile.findOneAndDelete({
      user: req.user.id
    });
    await User.findOneAndDelete({
      _id: req.user.id
    });
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route PUT api/profile/experience
// @desc put the user experience
// @access Private

router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('company', 'Company is required')
        .not()
        .isEmpty(),
      check('location', 'Location is required')
        .not()
        .isEmpty(),
      check('from', 'Beginning date is required')
        .not()
        .isEmpty(),
      check('current', 'Current is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    var error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    const {
      title,
      location,
      from,
      to,
      description,
      current,
      company
    } = req.body;
    const newExp = {
      title,
      location,
      from,
      to,
      description,
      current,
      company
    };

    try {
      const profile = await Profile.findOne({
        user: req.user.id
      }).populate('user', ['name', 'avatar']);
      if (!profile) {
        return res.status(400).json({ msg: 'No Profile' });
      }
      profile.experience.unshift(newExp);
      await profile.save();
      res.send(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route DELETE api/profile/experience/:exp_id
// @desc delete the user experience
// @access Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    });
    if (!profile) {
      return res.status(400).json({ msg: 'No Profile' });
    }
    var removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.send(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route PUT api/profile.education
// @desc put the user.education
// @access Private

router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required')
        .not()
        .isEmpty(),
      check('degree', 'Degree is required')
        .not()
        .isEmpty(),
      check('fieldofstudy', 'Field of study is required')
        .not()
        .isEmpty(),
      check('from', 'Beginning date is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    var error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    const {
      school,
      degree,
      from,
      to,
      description,
      current,
      fieldofstudy
    } = req.body;
    const newEdu = {
      school,
      degree,
      from,
      to,
      description,
      current,
      fieldofstudy
    };

    try {
      const profile = await Profile.findOne({
        user: req.user.id
      }).populate('user', ['name', 'avatar']);
      if (!profile) {
        return res.status(400).send('No Profile');
      }
      profile.education.unshift(newEdu);
      await profile.save();
      res.send(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route DELETE api/profile.education/:edu_id
// @desc delete the user.education
// @access Private

router.delete('/education/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    });
    if (!profile) {
      return res.status(400).send('No Profile');
    }
    var removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.send(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route GET api/profile/github/:username
// @desc get the user github repos
// @access Public
router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubClientSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };
    request(options, (error, response, body) => {
      if (error) console.log(error);
      if (response.statusCode !== 200) res.status(404).send('No Github repos');
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
