const mongoose = require('mongoose');

const WorkSpaceSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'projects',
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  expert: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  tasks: [
    {
      problem: {
        type: String,
      },
      solution: {
        type: String,
      },
      discussion: [
        {
          user_type: {
            type: String,
            enum: ['client', 'expert'],
          },
          content: {
            type: String,
          },
        },
      ],
    },
  ],
});
module.exports = WorkSpace = mongoose.model('workspaces', WorkSpaceSchema);
