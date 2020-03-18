const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook-token');
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const facebook = require('../private_key/facebook');
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
        if (!user || user.social !== 'none') {
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
passport.use(
  new FacebookStrategy(
    {
      clientID: facebook.AppID,
      clientSecret: facebook.AppSecret
    },
    function(accessToken, refreshToken, profile, done) {
      // console.log(accessToken);
      User.upsertFbUser(accessToken, refreshToken, profile, function(
        err,
        user
      ) {
        return done(err, user);
      });
    }
  )
);
