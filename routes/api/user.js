const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcryptjs = require('bcryptjs');
const User = require('../../models/User');
const UserVerify = require('../../models/UserVerify');
const ClientProject = require('../../models/ClientProject');
const config = require('config');
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');
const { uuid } = require('uuidv4');
const gmail = require('../../private_key/gmail');
const sendConfirmMail = (email, verify_id) => {
  var transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: gmail.user,
      pass: gmail.pass
    }
  });
  var mailOptions = {
    from: '"Confirm account" confirmation@gmail.com',
    to: email,
    subject: 'Test',
    html: `<p>Access the following URL to complete register process: https://localhost:3000/register/verify/${email}/${verify_id}</p>`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    res.render('index');
  });
};
router.post('/send', (req, res) => {
  sendConfirmMail();
});
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
      verify_id = uuid();
      const userField = {
        name,
        email,
        password,
        avatar,
        type,
        verify_id
      };
      var user_verify;
      user_verify = await UserVerify.findOne({ email });
      if (!user_verify) {
        user_verify = new UserVerify(userField);
      } else {
        for (let key in userField) user_verify[key] = userField[key];
      }

      // encrypt password
      const salt = await bcryptjs.genSalt(10);
      user_verify.password = await bcryptjs.hash(password, salt);

      await user_verify.save();

      sendConfirmMail(email, verify_id);
      res.send('success');
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route POST api/user/verify
// @desc Register verify page
// @access Public
router.post(
  '/verify',

  async (req, res) => {
    const { email, verify_id } = req.body;
    try {
      //if user already exist
      const user_verify = await UserVerify.findOne({ email });

      if (!user_verify) {
        return res.status(404).send('Not Found');
      }
      if (user_verify.verify_id === verify_id) {
        // return JWT
        const { name, password, type } = user_verify;
        user = new User({
          name,
          email,
          password,
          type
        });
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

        await user.save();
        if (type === 'client') {
          const newClientProject = new ClientProject({
            client: user.id
          });
          await newClientProject.save();
        }

        await UserVerify.deleteOne({ email });
      }
    } catch (err) {
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
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
