const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');
const User = require('../models/User');

// Rutas públicas
router.post('/register', register);
router.post('/login', login);

// Ruta protegida para usuarios autenticados
router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    message: 'Ruta protegida: perfil de usuario',
    user: req.user
  });
});

// Ruta protegida solo para admins
router.get('/admin/dashboard', authMiddleware, isAdmin, (req, res) => {
  res.json({
    message: 'Bienvenido al panel de administrador',
    user: req.user
  });
});

// Ruta para obtener todos los usuarios (solo admin)
router.get('/all', authMiddleware, isAdmin, async (req, res) => {
  try {
    const users = await User.find({}, 'name email role');
    res.json({ users });
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
});

module.exports = router;
