const mongoose = require('mongoose');

const ClientProjectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Type.ObjectId,
    ref: 'users'
  },
  projects: [
    {
      type: mongoose.Schema.Type.ObjectId,
      ref: 'project'
    }
  ]
});
module.exports = ClientProject = mongoose.model(
  'clientprojects',
  ClientProjectSchema
);
