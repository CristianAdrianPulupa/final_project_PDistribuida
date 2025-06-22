const express = require('express');
const router = express.Router();
const trackCtrl = require('../controllers/track.controller');

router.get('/', trackCtrl.getAllTracks);
router.post('/', trackCtrl.createTrack);

module.exports = router;

