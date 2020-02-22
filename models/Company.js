const mongoose = require('mongoose');
const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  contact: {
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    web: {
      type: String
    }
  },
  description: {
    type: String
  },
  benefit: {
    type: String
  },
  culture: {
    type: String
  },
  photo: {
    type: String
  }
});
module.exports = Company = mongoose.model('companies', CompanySchema);
