const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profiles'
  },
  //Keywords extracted from uploaded resume
  content: {
    type: String
  },
  //Keywords extracted from the profile form
  experience_list: [
    {
      target: {
        type: mongoose.Schema.Types.ObjectId
      },
      key_words: {
        type: String
      }
    }
  ]
});
module.exports = Resume = mongoose.model('resumes', ResumeSchema);
