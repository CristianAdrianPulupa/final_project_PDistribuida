const express = require('express');
const router = express.Router();
const controller = require('../controllers/settingsController');

router.get('/:userId', controller.getSettings);
router.put('/:userId', controller.updateSettings);

module.exports = router;
