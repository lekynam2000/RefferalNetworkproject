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
    default: 'referer'
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = User = mongoose.model('users', UserSchema);
