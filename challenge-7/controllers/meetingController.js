const Meeting = require('../models/Meeting');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
exports.createMeeting = async (req, res) => {

  const { code } = req.body;
  const host = req.id;
  try {
    const meeting = await Meeting.create({ code, host });
    res.redirect(`/meeting/${meeting.code}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.joinMeeting = async (req, res) => {
  const { code } = req.body;
  const participant = req.id;
  try {
    const meeting = await Meeting.findOne({ code });
    if (!meeting) {
      return res.status(404).send('Meeting Not Found');
    }
    meeting.participants.push(participant);
    await meeting.save();
    res.redirect(`/meeting/${meeting.code}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
