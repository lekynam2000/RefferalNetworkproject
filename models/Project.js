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
    type: Number,
    default: 0
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
  ],
  invitation: {
    type: Number
  },
  acceptance: [
    {
      lastPosition: {
        type: String
      },
      yearOfExperience: {
        type: Number
      }
    }
  ]
});
module.exports = Project = mongoose.model('projects', ProjectSchema);
