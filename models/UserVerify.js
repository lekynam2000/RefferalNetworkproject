const mongoose = require('mongoose');

const UserVerifySchema = new mongoose.Schema({
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
  verify_id: {
    type: String,
    required: true
  }
});

module.exports = UserVerify = mongoose.model('usersverify', UserVerifySchema);
