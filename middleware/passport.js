const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, cb) => {
      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return cb(null, false, {
            msg: 'Wrong infomation or the user is not exist'
          });
        }
        match = await bcryptjs.compare(password, user.password);
        if (!match) {
          return cb(null, false, {
            msg: 'Wrong infomation or the user is not exist'
          });
        }
        return cb(null, user, { msg: 'Logged In Successfully' });
      } catch (err) {
        cb(err);
      }
    }
  )
);
