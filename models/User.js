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
  date: {
    type: Date,
    default: Date.now
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'projects'
    }
  ]
});
module.exports = User = mongoose.model('users', UserSchema);
