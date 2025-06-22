const mongoose = require('mongoose');

const userSettingsSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  theme: { type: String, enum: ['light', 'dark'], default: 'light' },
  language: { type: String, default: 'es' },
}, { timestamps: true });

module.exports = mongoose.model('UserSettings', userSettingsSchema);
