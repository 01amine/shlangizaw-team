const path = require('path');
const fs = require('fs');
const asyncHandler = require("express-async-handler");
const {createFileInfo,
    deleteFileInfo,
} = require("../controllers/databaseController.js")

//@desc retrieve all files
//@route GET /api/files
//@access Public
const getFiles = (req, res) => {
    const directoryPath = path.join(__dirname, "../public/uploads");
    
    fs.readdir(directoryPath, (err, files) => {
        if(err) {
            return res.status(500);
        }

        res.status(200).json({ files }).json({ message : "file retrieved successfully"});
    })
}

//@desc retrieve a file by ID
//@route GET /api/files/:id
//@access Public
const getFile = asyncHandler( async (req, res) => {

    const filePath = path.join(__dirname, "../public/uploads", req.params.id);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404)
        }
    });

    res.sendFile(filePath).json({ message : "file sent successfully"})
});

//@desc upload a new file
//@route POST /upload
//@access Public
const addFile = asyncHandler( async(req, res) => {
    console.log('Uploaded file:', req.file);
    res.status(201).json({ message: 'File uploaded successfully', file: req.file })

    ;}, createFileInfo)


//@desc delete a file
//@route DELETE /delete
//@access Public
const deleteFile = asyncHandler( async (req, res) => {

    const filePath = path.join(__dirname, "../public/uploads", req.params.id);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404)
        }

        fs.unlink(filePath, (err) => {
            if (err) {
                return res.status(500)
            }
        })
    });

    res.status(200).json({ message : "file deleted successfully"})

}, deleteFileInfo);


module.exports = {addFile,
    getFiles,
    getFile,
    deleteFile
}
