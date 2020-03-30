const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profiles'
  },
  content: {
    type: String
  }
});
module.exports = Resume = mongoose.model('resumes', ResumeSchema);
