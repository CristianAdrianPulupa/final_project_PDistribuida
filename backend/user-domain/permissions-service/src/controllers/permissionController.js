const Permission = require('../models/Permission');

const createPermission = async (req, res) => {
  try {
    const { role, action } = req.body;
    const permission = new Permission({ role, action });
    await permission.save();
    res.status(201).json({ message: 'Permiso creado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear permiso', error: err.message });
  }
};

const checkPermission = async (req, res) => {
  try {
    const { role, action } = req.body;
    const exists = await Permission.findOne({ role, action });
    res.status(200).json({ permitted: !!exists });
  } catch (err) {
    res.status(500).json({ message: 'Error al verificar permiso', error: err.message });
  }
};

module.exports = { createPermission, checkPermission };
