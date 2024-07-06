const File = require("../models/fileModel");

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