const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  const { meetingId, content } = req.body;
  const sender = req.user.id;
  try {
    await Message.create({ meeting: meetingId, sender, content });
    res.status(200).send('Message Sent');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
