const mongoose = require('mongoose');

const meterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  timeSignature: String,
  clef: String
});

module.exports = mongoose.model('Meter', meterSchema);