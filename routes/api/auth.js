const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const config = require('config');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const createToken = function(payload) {
  return jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 30000000 });
};

const generateToken = function(req, res) {
  const token = createToken(req.payload);
  return res.json({ token });
};

// @route GET api/auth
// @desc Get user
// @access Public

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send('server err');
  }
});
// @route POST api/auth
// @desc Login
// @access Public

router.post(
  '/',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter password').exists()
  ],
  (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // const { email, password } = req.body;
    try {
      passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
          return res.status(400).json({
            errors: [{ msg: 'Wrong information or the user does not exist.' }]
          });
        }
        req.login(user, { session: false }, err => {
          if (err) {
            res.send(err);
          }
          // return JWT
          const payload = {
            user: {
              id: user.id
            }
          };
          jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 30000000 },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
        });
      })(req, res);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);
// @route POST api/auth/facebook/:user_type
// @desc Login by Facebook
// @access Public

router.post(
  '/facebook/:user_type',
  passport.authenticate('facebook-token', { session: false }),
  async (req, res, next) => {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }
    //Give type to user
    const user = await User.findById(req.user.id);
    user.type = req.params.user_type;
    user.save();
    // prepare token for API
    req.payload = {
      user: {
        id: req.user.id
      }
    };

    next();
  },
  generateToken
);

module.exports = router;
