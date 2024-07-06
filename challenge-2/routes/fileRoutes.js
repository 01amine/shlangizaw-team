const express = require('express');
const router = express.Router();
const {
    getFile,
    getFiles,
    uploadFile,
    deleteFile
} = require("../controllers/filesController.js");

router.route('/').get(getFiles);

router.route('/:id').get((req,res) => {
    res.status(200).json(`files ${req.params.id} succeffully retrieved`);
});

router.route('/').post(uploadFile);

router.route('/:id').delete((req,res) => {
    res.status(200).json(`files ${req.params.id} succeffully deleted`);
});

module.exports = router;