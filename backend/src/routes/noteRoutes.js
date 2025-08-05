const express = require("express");
const {
    getAllNotes,
    getNote,
    createNote,
    deleteNote,
    updateNote,
} = require("../controllers/noteController");
const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNote);
router.post("/", createNote);
router.patch("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;
