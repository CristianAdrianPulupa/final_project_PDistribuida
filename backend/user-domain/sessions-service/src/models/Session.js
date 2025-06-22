const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  loginAt: { type: Date, default: Date.now },
  logoutAt: { type: Date },
  token: { type: String } // opcional
});

module.exports = mongoose.model('Session', SessionSchema);
