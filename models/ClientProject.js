const mongoose = require('mongoose');

const ClientProjectSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'project'
    }
  ]
});
module.exports = ClientProject = mongoose.model(
  'clientprojects',
  ClientProjectSchema
);
