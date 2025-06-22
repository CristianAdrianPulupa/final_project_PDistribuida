const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const { getProfile, updateProfile } = require('../controllers/profileController');

// Obtener perfil por ID
router.get('/:userId', getProfile);

// Actualizar perfil
router.put('/:userId', updateProfile);

// 🔥 Nuevo: Crear perfil al registrar usuario
router.post('/', async (req, res) => {
  try {
    const { userId, name, email, bio, image } = req.body;

    // Validación simple
    if (!userId || !name || !email) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    const profile = new Profile({ userId, name, email, bio, image });
    await profile.save();
    res.status(201).json({ message: 'Perfil creado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear perfil', error: err.message });
  }
});

module.exports = router;
