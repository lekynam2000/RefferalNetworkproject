const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
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
  date: {
    type: Date,
    default: Date.now
  },
  projects: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'projects'
  }
});
module.exports = Client = mongoose.model('clients', ClientSchema);
