const express = require('express');
const controller = require('../controllers/notificationController');
const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: Notifications
 *     description: Operations on notifications
 */

/**
 * @openapi
 * /notifications:
 *   post:
 *     summary: Create a new notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       201:
 *         description: Notification created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       500:
 *         description: Internal server error
 */
router.post('/', controller.createNotification);

/**
 * @openapi
 * /notifications/{userId}:
 *   get:
 *     summary: Get all notifications for a user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID to fetch notifications for
 *         example: '64a3f9b7e1a4c9d3f0b7e4a'
 *     responses:
 *       200:
 *         description: List of notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       500:
 *         description: Internal server error
 */
router.get('/:userId', controller.getNotificationsByUser);

module.exports = router;
