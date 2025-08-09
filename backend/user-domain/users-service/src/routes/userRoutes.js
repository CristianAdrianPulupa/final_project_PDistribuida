const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');
const User = require('../models/User');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User account management
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "mySecret123"
 *     responses:
 *       '201':
 *         description: User successfully created
 *       '400':
 *         description: Bad request – invalid input data
 *       '500':
 *         description: Internal server error
 */
router.post('/register', register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate user and return a JWT
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "mySecret123"
 *     responses:
 *       '200':
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT for authenticated requests
 *       '401':
 *         description: Unauthorized – invalid credentials
 */
router.post('/login', login);

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get authenticated user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Protected route: user profile"
 *                 user:
 *                   type: object
 *       '401':
 *         description: Unauthorized – missing or invalid token
 */
router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    message: 'Protected route: user profile',
    user: req.user
  });
});

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Administrator-only operations
 */

/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     summary: Access admin dashboard
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Welcome message for admins
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Welcome to the admin dashboard"
 *                 user:
 *                   type: object
 *       '401':
 *         description: Unauthorized – missing or invalid token
 *       '403':
 *         description: Forbidden – user is not an admin
 */
router.get('/admin/dashboard', authMiddleware, isAdmin, (req, res) => {
  res.json({
    message: 'Welcome to the admin dashboard',
    user: req.user
  });
});

/**
 * @swagger
 * /all:
 *   get:
 *     summary: Retrieve all user records (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       role:
 *                         type: string
 *       '401':
 *         description: Unauthorized – missing or invalid token
 *       '403':
 *         description: Forbidden – user is not an admin
 *       '500':
 *         description: Internal server error
 */
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
