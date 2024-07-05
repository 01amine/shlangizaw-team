const express = require('express');
const { createMeeting, joinMeeting } = require('../controllers/meetingController');
const router = express.Router();

router.post('/create', createMeeting);
router.post('/join', joinMeeting);

module.exports = router;
