const upload = require("../middlewares/upload.js");

//@desc Get all files
//@route GET /api/files
//@access Public
const getFiles = ('/', (req, res) => {
    res.status(200).json("files succeffully retrieved");
});

//@desc Get file
//@route GET /api/file/:id
//@access Public
const getFile = ((req, res) => {
    console.log(res.body);
    console.log(res.files);
    res.status(200).json("files succeffully retrieved");
});

//@desc upload file
//@route GET /api/file/:id
//@access Public
const uploadFile = ('/',upload.fields("file"), (req, res) => {
    console.log(req.body);
    console.log(req.files);
    res.json({ message: "Successfully uploaded files" });
});

//@desc delete file
//@route GET /api/file/:id
//@access Public
const deleteFile = ('/', (req, res) => {
    
});

module.exports = {
    getFile, 
    getFiles,
    uploadFile,
    deleteFile
}



