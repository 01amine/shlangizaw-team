const express = require('express');
const { sendMessage } = require('../controllers/chatController');
const router = express.Router();
const authmiddlware = require('../middlewares/auth');
router.post('/send', authmiddlware ,sendMessage);

module.exports = router;
