const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({

  roomId : {
    type : String,
    required : true,
  },
  message : {
    type : String,
    required : true,
  },
  userId : {
    type : String,
    required : true,
  }
});

module.exports = mongoose.model('Message', MessageSchema);
