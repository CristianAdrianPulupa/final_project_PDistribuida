const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema({
  trackName: String,
  position: Number,
  duration: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Timeline', timelineSchema);
