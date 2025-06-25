const express = require('express');
const router = express.Router();
const meterController = require('../controllers/meterController');

router.get('/', meterController.getAllMeters);
router.post('/', meterController.createMeter);
router.put('/:id', meterController.updateMeter);
router.delete('/:id', meterController.deleteMeter);


module.exports = router;