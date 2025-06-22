const Track = require('../models/track.model');
const { calculateReverb } = require('../soapClient');

exports.getAllTracks = async (req, res) => {
  const tracks = await Track.find();
  res.json(tracks);
};

exports.createTrack = async (req, res) => {
  try {
    const { title, artist, duration, roomSize = 'medium', distance = 2 } = req.body;

    const effectsResult = await calculateReverb(roomSize, distance);

    const track = new Track({
      title,
      artist,
      duration,
      effects: {
        decayTime: parseFloat(effectsResult.decayTime),
        wetLevel: parseFloat(effectsResult.wetLevel)
      }
    });

    await track.save();
    res.status(201).json(track);
  } catch (err) {
  console.error('❌ Error completo en createTrack:', err);
  res.status(500).json({
    message: 'Error creating track',
    details: err.message,
    stack: err.stack
  });
}
};

