const express = require('express');
const router = express.Router();
const { generateWaveform } = require('../controllers/waveform.controller');

router.post('/generate', generateWaveform);

module.exports = router;
