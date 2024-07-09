const express = require('express');
const { createMeeting, joinMeeting } = require('../controllers/meetingController');
const router = express.Router();
const authmiddlware = require('../middlewares/auth');
router.post('/create', authmiddlware,createMeeting);
router.post('/join', authmiddlware,joinMeeting);

module.exports = router;
