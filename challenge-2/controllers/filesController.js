
const addFile = (req, res) => {
    console.log('Uploaded file:', req.file);
    res.status(201).json({ message: 'File uploaded successfully', file: req.file });}

module.exports = {addFile}