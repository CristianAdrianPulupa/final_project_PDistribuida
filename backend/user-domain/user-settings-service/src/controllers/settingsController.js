const UserSettings = require('../models/UserSettings');

// Obtener configuración
exports.getSettings = async (req, res) => {
  try {
    const { userId } = req.params;
    const settings = await UserSettings.findOne({ userId });

    if (!settings) {
      return res.status(404).json({ message: 'Configuración no encontrada' });
    }

    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener configuración' });
  }
};

// Actualizar o crear configuración
exports.updateSettings = async (req, res) => {
  try {
    const { userId } = req.params;
    const { theme, language } = req.body;

    const settings = await UserSettings.findOneAndUpdate(
      { userId },
      { theme, language },
      { new: true, upsert: true }
    );

    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar configuración' });
  }
};
