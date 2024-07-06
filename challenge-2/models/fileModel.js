const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
    ID: {
        type: Number,
        required: [true, "ID is required"]
    },
    originalName: {
        type: String,
        required: [true, "Original file name is required"]
    },
    filename: {
        type: String,
        required: [true, "Stored file name is required"]
    },
    path: {
        type: String,
        required: [true, "File path is required"]
    },
    size: {
        type: Number,
        required: [true, "File size is required"]
    },
    mimetype: {
        type: String,
        required: [true, "MIME type is required"]
    },
    uploadDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('File', fileSchema)