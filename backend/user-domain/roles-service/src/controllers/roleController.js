const Role = require('../models/Role');

const createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const newRole = new Role({ name });
    await newRole.save();
    res.status(201).json({ message: 'Rol creado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el rol', error: err.message });
  }
};

const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los roles', error: err.message });
  }
};

module.exports = { createRole, getRoles };
