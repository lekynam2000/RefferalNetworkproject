const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const ClientProject = require('../../models/ClientProject');
const config = require('config');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const axios = require('axios');
const linkedin =
  process.env.NODE_ENV === 'production'
    ? JSON.parse(process.env.linkedin)
    : require('../../private_key/linkedin');
const createToken = function(payload) {
  let secret =
    process.env.NODE_ENV === 'production'
      ? process.env['jwtSecret']
      : config.get('jwtSecret');
  return jwt.sign(payload, secret, { expiresIn: 30000000 });
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
      let secret =
        process.env.NODE_ENV === 'production'
          ? process.env['jwtSecret']
          : config.get('jwtSecret');
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
          jwt.sign(payload, secret, { expiresIn: 30000000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
          });
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
    // console.log(user);
    user.type = req.params.user_type;
    if (user.type === 'client') {
      let cp = await ClientProject.findOne({
        client: user._id
      });
      if (!cp) {
        cp = new ClientProject({
          client: user._id
        });
        cp.save();
      }
    }
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
// @route POST api/auth/linkedin/:user_type
// @desc Login by Linkedin
// @access Public

router.post('/linkedin/:user_type', async (req, res) => {
  const access_token = req.body.access_token;
  const user = {};
  try {
    const dataEmail = await axios.get(
      'https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Connection: 'Keep Alive'
        }
      }
    );
    if (dataEmail.data['handle!']) {
      return res.status(400).send(dataEmail.data['handle!'].message);
    }
    user.email = dataEmail.data.elements.filter(el => el.type === 'EMAIL')[0][
      'handle~'
    ].emailAddress;
    const dataUser = await axios.get('https://api.linkedin.com/v2/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Connection: 'Keep Alive'
      }
    });
    user.id = dataUser.data.id;
    // console.log(dataUser.data);
    user.name =
      dataUser.data.firstName.localized[
        Object.keys(dataUser.data.firstName.localized)[0]
      ] +
      ' ' +
      dataUser.data.lastName.localized[
        Object.keys(dataUser.data.lastName.localized)[0]
      ];
    console.log(user.name);
    user.avatar = dataUser.data.profilePicture.displayImage;
    const existedUser = await User.findOne({ email: user.email });

    if (!existedUser) {
      var newUser = new User({
        email: user.email,
        name: user.name,
        password: 'donotmatter',
        social: 'linkedin',
        social_id: user.id,
        type: req.params.user_type,
        avatar: user.avatar
      });
      await newUser.save();
      if (req.params.user_type === 'client') {
        let cp = new ClientProject({
          client: newUser._id
        });
        await cp.save();
      }
    } else if (existedUser && existedUser.type === 'none') {
      return res.status(400).send('Duplicate Email');
    } else {
      existedUser.avatar = user.avatar.replace('urn:li:', 'https://');
      await existedUser.save();
    }
    const currentUser = await User.findOne({ email: user.email });
    req.payload = {
      user: {
        id: currentUser.id
      }
    };
    generateToken(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// @route POST api/auth/linkedin/:user_type
// @desc Login by Linkedin
// @access Public

router.get('/linkedin_code', async (req, res) => {
  const code = req.query.code;
  const redirect_uri = req.query.redirect_uri;
  const config = {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*'
    }
  };

  const body = `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}&client_id=${linkedin.AppID}&client_secret=${linkedin.AppSecret}`;
  try {
    const data = await axios.post(
      'https://www.linkedin.com/oauth/v2/accessToken',
      body,
      config
    );
    return res.send(data.data.access_token);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
