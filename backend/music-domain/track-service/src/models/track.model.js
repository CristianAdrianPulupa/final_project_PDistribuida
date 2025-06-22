const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
  title: String,
  artist: String,
  duration: Number,
  effects: {
    decayTime: Number,
    wetLevel: Number
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Track', TrackSchema);
