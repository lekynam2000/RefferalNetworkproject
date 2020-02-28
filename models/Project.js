const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clients'
  },
  posted_day: {
    type: Date,
    default: Date.now
  },
  fieldofexpert: {
    type: String,
    required: true
  },
  skills: {
    type: [String]
  },
  location: {
    type: String
  },
  experienceRequired: {
    type: Number
  },
  description: {
    type: String,
    required: true
  },
  history: [
    {
      status: {
        type: String
      },
      time: {
        type: Date,
        default: Date.now
      }
    }
  ]
});
module.exports = Project = mongoose.model('projects', ProjectSchema);
