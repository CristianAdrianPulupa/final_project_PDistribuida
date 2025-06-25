const UserSettings = require('../models/UserSettings');

// Get configuration
exports.getSettings = async (req, res) => {
  try {
    const { userId } = req.params;
    const settings = await UserSettings.findOne({ userId });

    if (!settings) {
      return res.status(404).json({ message: 'Configuration not found' });
    }

    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: 'Error getting configuration' });
  }
};

// Update or create configuration
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
    res.status(500).json({ error: 'Error updating configuration' });
  }
};
