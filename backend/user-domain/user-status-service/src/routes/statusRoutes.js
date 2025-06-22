import express from "express";
import UserStatus from "../models/UserStatus.js";

const router = express.Router();

// ✅ Ruta POST para crear el estado
router.post("/", async (req, res) => {
  try {
    const { userId, status } = req.body;

    const updatedStatus = await UserStatus.findOneAndUpdate(
      { userId },
      { userId, status },
      { new: true, upsert: true } // <- esto actualiza o crea
    );

    res.status(201).json(updatedStatus);
  } catch (error) {
    res.status(500).json({ message: "Error al crear o actualizar estado", error });
  }
});

// ✅ Ruta GET para obtener estado por userId
router.get("/:userId", async (req, res) => {
  try {
    const result = await UserStatus.findOne({ userId: req.params.userId });
    if (!result) {
      return res.status(404).json({ message: "Estado no encontrado" });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error del servidor", error });
  }
});

export default router;
