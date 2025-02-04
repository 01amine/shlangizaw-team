const express = require('express');
const multer  = require('multer');
const path = require('path');
const { countFiles } = require('../controllers/databaseController.js');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
      }
})

const upload = multer({ 
    storage:storage
 });

module.exports = upload




