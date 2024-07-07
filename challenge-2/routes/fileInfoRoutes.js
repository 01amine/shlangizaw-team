const express = require('express');
const router = express.Router();
const { 
    createFileInfo,
    getFilesInfo,
    getFileInfo,
    updateFileInfo,
    deleteFileInfo,
    countFiles
 } = require('../controllers/databaseController');

router.get('/getfilesinfo', getFilesInfo)
router.get('/getfileinfo/:id', getFileInfo)
router.put('/updatefileinfo/:id', updateFileInfo)
router.delete('/deleteFileInfo/:id', deleteFileInfo)
router.post('/uploadFileInfo', createFileInfo)
router.get('/countFiles', countFiles)


module.exports = router