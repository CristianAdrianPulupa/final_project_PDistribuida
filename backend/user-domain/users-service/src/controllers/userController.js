const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const axios = require('axios');

// REGISTRO
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await user.save();

    // Crear perfil
    try {
      await axios.post('http://profile-service:3006/api/profile', {
        userId: user._id.toString(),
        name,
        email,
        bio: 'Soy nuevo en la plataforma',
        image: 'https://i.imgur.com/anon.png'
      });
    } catch (profileErr) {
      console.error('Error al crear perfil:', profileErr.message);
    }

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al registrar usuario', error: err.message });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    // ✅ ACTUALIZAR ESTADO A "activo" EN user-status-service
    try {
      await axios.post('http://user-status-service:3008/api/status', {
        userId: user._id.toString(),
        status: "activo"
      });
    } catch (statusErr) {
      console.error('⚠️ Error al actualizar estado del usuario:', statusErr.message);
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

module.exports = { register, login };
