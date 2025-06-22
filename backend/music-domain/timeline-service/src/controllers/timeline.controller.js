const Timeline = require('../models/timeline.model');

exports.addTrackToTimeline = async (req, res) => {
  try {
    const { trackName, position, duration } = req.body;
    const timeline = new Timeline({ trackName, position, duration });
    await timeline.save();
    res.status(201).json(timeline);
  } catch (err) {
    res.status(500).json({ message: 'Error adding track to timeline', details: err.message });
  }
};

exports.getTimeline = async (req, res) => {
  try {
    const timeline = await Timeline.find().sort({ position: 1 });
    res.json(timeline);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving timeline', details: err.message });
  }
};
