const express = require('express');
const router = express.Router();
const upload = require("../middlewares/upload.js");
const {addFile,
    getFiles,
    getFile,
    deleteFile
} = require("../controllers/filesController.js")

router.get('/', getFiles)
router.get('/:id', getFile)
router.post('/upload', upload.single('file'), addFile)
router.delete('/:id', deleteFile)

module.exports = router;