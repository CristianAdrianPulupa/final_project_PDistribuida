const Profile = require('../models/Profile');

const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await Profile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener perfil', error: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updated = await Profile.findOneAndUpdate(
      { userId },
      req.body,
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar perfil', error: err.message });
  }
};

module.exports = { getProfile, updateProfile };
