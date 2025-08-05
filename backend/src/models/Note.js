const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true } // adds createdAt and updatedAt by default to all documents
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
