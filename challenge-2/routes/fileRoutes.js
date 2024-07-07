const express = require('express');
const router = express.Router();
const upload = require("../middlewares/upload.js");
const {addFile} = require("../controllers/filesController.js")

roue

router.post('/upload', upload.single('file'), addFile)

module.exports = router;