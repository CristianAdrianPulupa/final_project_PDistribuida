import express from "express";
import UserStatus from "../models/UserStatus.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Status
 *   description: Operations on user status
 */

/**
 * @swagger
 * /status:
 *   post:
 *     summary: Create or update a user's status
 *     tags: [Status]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserStatus'
 *     responses:
 *       '201':
 *         description: Status created or updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserStatus'
 *       '500':
 *         description: Internal server error
 */
router.post("/", async (req, res) => {
  try {
    const { userId, status } = req.body;
    const updatedStatus = await UserStatus.findOneAndUpdate(
      { userId },
      { userId, status },
      { new: true, upsert: true }
    );
    res.status(201).json(updatedStatus);
  } catch (error) {
    res.status(500).json({ message: "Error creating or updating status", error });
  }
});

/**
 * @swagger
 * /status/{userId}:
 *   get:
 *     summary: Get status for a specific user
 *     tags: [Status]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID whose status to retrieve
 *     responses:
 *       '200':
 *         description: User status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserStatus'
 *       '404':
 *         description: Status not found
 *       '500':
 *         description: Internal server error
 */
router.get("/:userId", async (req, res) => {
  try {
    const result = await UserStatus.findOne({ userId: req.params.userId });
    if (!result) {
      return res.status(404).json({ message: "Status not found" });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
