const express = require('express');
const router = express.Router();
const controller = require('../controllers/timeline.controller');

router.post('/add', controller.addTrackToTimeline);
router.get('/', controller.getTimeline);

module.exports = router;
