const File = require("../models/fileModel");
const asyncHandler = require('express-async-handler')

//@desc Get all files info
//@route GET /api/getfilesinfo
//@access Public
const getFilesInfo = asyncHandler(async (req, res) => {
    const files = await File.find();
    if (!files) {
        return res.status(500);
    }
    res.status(200).json(fileInfo);
});

//@desc Get file info
//@route GET /api/getfileinfo/:id
//@access Public
const getFileInfo = async (req, res) => {
    const { ID,
        originalname,
        filename, 
        path, size, 
        mimetype, 
        uploadDate} = req.body;
    const fileInfo = await File.findById(req.params.ID);
    res.status(200).json(fileInfo);
};

//@desc Update file info
//@route Update /api/updatefileinfo/:id
//@access Public
const updateFileInfo = async (req, res) => {
    const { ID,
        originalname,
        filename, 
        path, size, 
        mimetype, 
        uploadDate} = req.body;
    const fileInfo = await File.findById(req.params.ID);
    res.status(200).json(fileInfo);
};

//@desc create new file
//@route POST /uploadFileInfo
//@access Public
const createFileInfo = asyncHandler(async (req, res) => {
    const {
        ID,
        originalname,
        filename,
        path,
        size,
        mimetype,
        uploadDate
    } = req.body;
    console.log(req.body.originalname)
    const files = await File.find();
    if (!files) {
        return res.status(500);
    }
    res.status(200).json({ message : "file created successfully"});
});

//@desc Get number of files
//@route GET /api/countFiles
//@access Public
const countFiles = asyncHandler(async (req, res) => {
    const NBfiles = await File.countDocuments();
    if (!NBfiles) {
        return res.status(500);
    }
    res.status(200).json(NBfiles);
    return NBfiles;
});

//@desc delete a files
//@route GET /api/deleteFileInfo/:id
//@access Public
const deleteFileInfo = asyncHandler(async (req, res) => {
    const file = await File.findById(req.params.ID);
    if (!file) {
        return res.status(500);
    }
    await file.remove();
    res.status(200).json({ message : "file deleted successfully"});
});

module.exports = {createFileInfo,
    getFilesInfo,
    getFileInfo,
    updateFileInfo,
    deleteFileInfo,
    countFiles
}