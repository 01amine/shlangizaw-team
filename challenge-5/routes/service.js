const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.get('/list', serviceController.listServices);
router.post('/start', serviceController.startService);
router.post('/stop', serviceController.stopService);

module.exports = router;
