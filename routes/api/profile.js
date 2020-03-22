const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const facebookPrivate = require('../../private_key/facebook');
const config = require('config');
const request = require('request');
const fileUpload = require('express-fileupload');
const fs = require('fs');
router.use(fileUpload());
// @route GET api/profile/me
// @desc get current user profile
// @access Private

router.get('/me', auth, async (req, res) => {
  // console.log('done');
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
      hourly_input_rate,
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
    if (hourly_input_rate) profileFields.hourly_input_rate = hourly_input_rate;
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
// @route POST api/profile/resume_upload
// @desc create or update user resume
// @access Private
router.post('/resume_upload', auth, async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
  const replacedname = file.name.split('.');
  replacedname[0] = req.user.id;
  const newName = Date.now() + replacedname.join('.');
  const profile = await Profile.findOne({ user: req.user.id });
  if (profile.resume_file) {
    try {
      fs.unlinkSync(profile.resume_file);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
  file.mv(`./resume/${newName}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  });
  profile.resume_file = `./resume/${newName}`;
  await profile.save();
  res.json({ fileName: file.name, filePath: `/resume/${newName}` });
});
// @route GET api/profile/download/:user_id
// @desc download the full resume
// @access Public
router.get('/download/:user_id', async (req, res) => {
  const profile = await Profile.findOne({ user: req.params.user_id });
  if (!profile || !profile.resume_file) {
    return res.status(400).send('Bad Request');
  }
  await res.download(profile.resume_file);
});

// @route GET api/profile
// @desc get all user profile
// @access Public

router.get('/', async (req, res) => {
  try {
    const profileList = await Profile.find().populate('user', [
      'name',
      'avatar',
      'type'
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
router.get('/user/:user_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar', 'email', 'type']);
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

// @route PUT api/profile/education
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

// @route DELETE api/profile/education/:edu_id
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

module.exports = router;
