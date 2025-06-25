import express from "express";
import UserStatus from "../models/UserStatus.js";

const router = express.Router();

// ✅ POST route to create the state
router.post("/", async (req, res) => {
  try {
    const { userId, status } = req.body;

    const updatedStatus = await UserStatus.findOneAndUpdate(
      { userId },
      { userId, status },
      { new: true, upsert: true } // <- this updates or creates
    );

    res.status(201).json(updatedStatus);
  } catch (error) {
    res.status(500).json({ message: "Error creating or updating status", error });
  }
});

// ✅ GET route to obtain status by userId
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
