const express = require('express');
const router = express.Router();
const controller = require('../controllers/settingsController');

/**
 * @openapi
 * tags:
 *   - name: Settings
 *     description: Operations on user settings
 */

/**
 * @openapi
 * /settings/{userId}:
 *   get:
 *     summary: Retrieve settings for a specific user
 *     tags: [Settings]
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
 *       200:
 *         description: Settings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSettings'
 *       404:
 *         description: Settings not found
 *       500:
 *         description: Internal server error
 */
router.get('/:userId', controller.getSettings);

/**
 * @openapi
 * /settings/{userId}:
 *   put:
 *     summary: Update or create settings for a specific user
 *     tags: [Settings]
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSettings'
 *     responses:
 *       200:
 *         description: Settings updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSettings'
 *       500:
 *         description: Internal server error
 */
router.put('/:userId', controller.updateSettings);

module.exports = router;
