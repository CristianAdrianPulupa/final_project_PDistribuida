import express from "express";
import UserNote from "../models/UserNote.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Operations on user notes
 */

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a new note for a user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserNote'
 *     responses:
 *       '201':
 *         description: Note created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserNote'
 *       '500':
 *         description: Internal server error
 */
router.post("/", async (req, res) => {
  try {
    const newNote = new UserNote(req.body);
    const saved = await newNote.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error creating note", error: err });
  }
});

/**
 * @swagger
 * /notes/{userId}:
 *   get:
 *     summary: Retrieve all notes for a specific user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *         example: "64a3f9b7e1a4c9d3f0b7e4a"
 *     responses:
 *       '200':
 *         description: List of user notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserNote'
 *       '500':
 *         description: Internal server error
 */
router.get("/:userId", async (req, res) => {
  try {
    const notes = await UserNote.find({ userId: req.params.userId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes", error: err });
  }
});

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Update an existing note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the note to update
 *         example: "64a3fa12e1a4c9d3f0b7e4b"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserNote'
 *     responses:
 *       '200':
 *         description: Note updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserNote'
 *       '500':
 *         description: Internal server error
 */
router.put("/:id", async (req, res) => {
  try {
    const updated = await UserNote.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating note", error: err });
  }
});

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Delete a note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the note to delete
 *         example: "64a3fa12e1a4c9d3f0b7e4b"
 *     responses:
 *       '200':
 *         description: Note deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Note deleted"
 *       '404':
 *         description: Note not found
 *       '500':
 *         description: Internal server error
 */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await UserNote.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting note", error: err });
  }
});

export default router;
