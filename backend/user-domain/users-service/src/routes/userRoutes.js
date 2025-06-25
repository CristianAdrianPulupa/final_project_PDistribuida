const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');
const User = require('../models/User');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route for authenticated users
router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    message: 'Protected route: user profile',
    user: req.user
  });
});

// Protected route for admins only
router.get('/admin/dashboard', authMiddleware, isAdmin, (req, res) => {
  res.json({
    message: 'Welcome to the admin dashboard',
    user: req.user
  });
});

// Route to get all users (admin only)
router.get('/all', authMiddleware, isAdmin, async (req, res) => {
  try {
    const users = await User.find({}, 'name email role');
    res.json({ users });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

module.exports = router;
