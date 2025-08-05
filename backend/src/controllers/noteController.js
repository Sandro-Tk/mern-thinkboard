const Note = require("../models/Note");

exports.getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 }); // -1 will sort in descending order, newest first

        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: "Error getting notes",
        });
    }
};

exports.getNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note)
            return res.status(404).json({
                status: "fail",
                message: "Note not found",
            });

        res.status(200).json({
            status: "success",
            data: note,
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: "Error getting note",
        });
    }
};

exports.createNote = async (req, res) => {
    try {
        const newNote = await Note.create(req.body);

        res.status(201).json({
            status: "success",
            message: "Note created successfully",
            data: newNote,
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "Error creating note",
        });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedNote) {
            return res.status(404).json({
                status: "fail",
                message: "Note not found",
            });
        }

        res.status(200).json({
            status: "success",
            message: "Note updated successfully",
            data: updatedNote,
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "Internal error",
        });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note)
            return res.status(404).json({
                status: "fail",
                message: "Note not found",
            });

        res.status(204).json({
            status: "success",
            message: "Note deleted successfully",
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "Internal error",
        });
    }
};
