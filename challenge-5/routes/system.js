const express = require('express');
const router = express.Router();
const systemController = require('../controllers/systemController');

router.post('/execute-command', systemController.executeSystemCommand);

module.exports = router;
