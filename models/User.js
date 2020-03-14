const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  type: {
    type: String,
    default: 'expert',
    enum: ['expert', 'admin', 'client']
  },
  social: {
    type: String,
    default: 'none'
  },
  social_id: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'projects'
    }
  ],
  application: [
    {
      project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project'
      },
      accepted: {
        type: mongoose.Schema.Types.Boolean,
        default: false
      }
    }
  ]
});
UserSchema.statics.upsertFbUser = function(
  accessToken,
  refreshToken,
  profile,
  cb
) {
  var that = this;
  return this.findOne(
    {
      social: 'facebook',
      social_id: profile.id
    },
    function(err, user) {
      // no user was found, lets create a new one
      if (!user) {
        var newUser = new that({
          email: profile.emails[0].value,
          name: profile.displayName,
          password: 'donotmatter',
          social: 'facebook',
          social_id: profile.id
        });

        newUser.save(function(error, savedUser) {
          if (error) {
            console.log(error);
          }
          return cb(error, savedUser);
        });
      } else {
        return cb(err, user);
      }
    }
  );
};

module.exports = User = mongoose.model('users', UserSchema);
