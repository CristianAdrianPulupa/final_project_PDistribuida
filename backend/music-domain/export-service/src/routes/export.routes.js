const express = require('express');
const router = express.Router();
const { exportTrack } = require('../controllers/export.controller');

router.post('/export', exportTrack);

module.exports = router;
