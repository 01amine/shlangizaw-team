const express = require('express');
const router = express.Router();
const directoryController = require('../controllers/directoryController');

router.get('/list', directoryController.listDirectory);

module.exports = router;
