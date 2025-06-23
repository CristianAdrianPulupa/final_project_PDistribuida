import express from "express";
import UserNote from "../models/UserNote.js";

const router = express.Router();

// POST /api/notes
router.post("/", async (req, res) => {
  try {
    const newNote = new UserNote(req.body);
    const saved = await newNote.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error al crear nota", error: err });
  }
});

// GET /api/notes/:userId
router.get("/:userId", async (req, res) => {
  try {
    const notes = await UserNote.find({ userId: req.params.userId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener notas", error: err });
  }
});

// Actualizar nota
router.put('/:id', async (req, res) => {
  try {
    const updated = await UserNote.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar nota' });
  }
});

// Eliminar nota
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await UserNote.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Nota no encontrada' });
    res.json({ message: 'Nota eliminada' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar nota' });
  }
});

export default router;
