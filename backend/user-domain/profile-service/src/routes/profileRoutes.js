const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const { getProfile, updateProfile } = require('../controllers/profileController');

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Operations on user profiles
 */

/**
 * @swagger
 * /profile/{userId}:
 *   get:
 *     summary: Get profile by user ID
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier of the user
 *         example: "64a3f9b7e1a4c9d3f0b7e4a"
 *     responses:
 *       '200':
 *         description: Profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       '404':
 *         description: Profile not found
 *       '500':
 *         description: Internal server error
 */
router.get('/:userId', getProfile);

/**
 * @swagger
 * /profile/{userId}:
 *   put:
 *     summary: Update an existing user profile
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier of the user
 *         example: "64a3f9b7e1a4c9d3f0b7e4a"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       '200':
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       '400':
 *         description: Bad request – missing or invalid data
 *       '404':
 *         description: Profile not found
 *       '500':
 *         description: Internal server error
 */
router.put('/:userId', updateProfile);

/**
 * @swagger
 * /profile:
 *   post:
 *     summary: Create a new user profile
 *     tags: [Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       '201':
 *         description: Profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile created successfully"
 *       '400':
 *         description: Bad request – missing required fields
 *       '500':
 *         description: Internal server error
 */
router.post('/', async (req, res) => {
  console.log('👉 BODY recibdo en Profile POST:', req.body);
  try {
    const { userId, name, email, bio, image } = req.body;

    if (!userId || !name || !email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const profile = new Profile({ userId, name, email, bio, image });
    await profile.save();
    res.status(201).json({ message: 'Profile created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating profile', error: err.message });
  }
});

module.exports = router;
