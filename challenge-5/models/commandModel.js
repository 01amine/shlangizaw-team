const mongoose = require('mongoose');

const commandSchema = new mongoose.Schema({
  command: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
  executedAt: {
    type: Date,
    default: Date.now,
  },
});

const Command = mongoose.model('command', commandSchema);

module.exports = Command;
