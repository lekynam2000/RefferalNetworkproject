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
  }
});
module.exports = Project = mongoose.model('projects', ProjectSchema);
