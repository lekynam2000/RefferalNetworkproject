const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clients',
  },
  posted_day: {
    type: Date,
    default: Date.now,
  },
  fieldofexpert: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
  },
  location: {
    type: String,
  },
  experienceRequired: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
  history: [
    {
      status: {
        type: String,
      },
      time: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  application: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
      accepted: {
        type: mongoose.Schema.Types.Boolean,
        default: false,
      },
      approved: {
        type: mongoose.Schema.Types.Boolean,
        default: false,
      },
      workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'workspaces',
      },
    },
  ],
});
module.exports = Project = mongoose.model('projects', ProjectSchema);
