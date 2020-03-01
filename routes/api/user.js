const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcryptjs = require('bcryptjs');
const User = require('../../models/User');
const ClientProject = require('../../models/ClientProject');
const config = require('config');
const jwt = require('jsonwebtoken');
// @route POST api/users
// @desc Register page
// @access Public
router.post(
  '/',
  [
    check('name', 'Name can not be empty')
      .not()
      .isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Password must be equal or more than 6 characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, type } = req.body;
    try {
      //if user already exist

      var user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exist' }] });
      }
      //get user avatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      user = new User({ name, email, password, avatar, type });
      // encrypt password
      const salt = await bcryptjs.genSalt(10);
      user.password = await bcryptjs.hash(password, salt);

      await user.save();
      // return JWT
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3000000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      const newProject = new ClientProject({
        client: user.id
      });
      await newProject.save();
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route POST api/users/admin
// @desc Register new admin
// @access Public

router.post(
  '/admin',
  [
    check('name', 'Name can not be empty')
      .not()
      .isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Password must be equal or more than 6 characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      //if user already exist

      var user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exist' }] });
      }
      //get user avatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      user = new User({ name, email, password, type: 'admin', avatar });
      // encrypt password
      const salt = await bcryptjs.genSalt(10);
      user.password = await bcryptjs.hash(password, salt);

      await user.save();
      // return JWT
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3000000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
