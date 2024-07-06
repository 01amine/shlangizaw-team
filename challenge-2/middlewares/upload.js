const express = require('express');
const multer  = require('multer');

const storage = multer.storage({
    destination: function(req, file, cb) {
        cb(null, "../files")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+file.originalname)
      }
})

const upload = multer({ 
    storage:storage
 });





