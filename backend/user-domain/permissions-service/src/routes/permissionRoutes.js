const express = require('express');
const router = express.Router();
const { createPermission, checkPermission } = require('../controllers/permissionController');

router.post('/', createPermission);         // Crear permiso
router.post('/check', checkPermission);     // Verificar permiso

module.exports = router;
