const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  const { meetingId, content } = req.body;
  const sender = req.id;
  try {
    await Message.create({ roomId: meetingId,userId : sender,message : content });
    res.status(200).send('Message Sent');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
