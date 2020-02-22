const mongoose = require('mongoose');
const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companies',
    required: true
  },
  company_name: {
    type: String
  },
  role: {
    type: String,
    required: true
  },
  salary: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  posted_day: {
    type: Date,
    default: Date.now
  },
  expired: {
    type: Date
  },
  referral_fee: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    type: String
  },
  application: [
    {
      referer: {
        type: mongoose.Schema.Types.ObjectId
      },
      resume: {
        type: Object
      }
    }
  ]
});
module.exports = Job = mongoose.model('jobs', JobSchema);
