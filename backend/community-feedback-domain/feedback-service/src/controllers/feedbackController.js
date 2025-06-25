const Feedback = require('../models/feedbackModel');

exports.getAll = async (req, res) => {
  const data = await Feedback.find().sort({ createdAt: -1 });
  res.json(data);
};

exports.create = async (req, res) => {
  const { username, message, rating } = req.body;
  const feedback = new Feedback({ username, message, rating });
  await feedback.save();
  res.status(201).json(feedback);
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  const result = await Feedback.findByIdAndDelete(id);
  if (result) res.json({ message: 'Deleted' });
  else res.status(404).json({ error: 'Not found' });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { message, rating } = req.body;

  const updated = await Feedback.findByIdAndUpdate(
    id,
    { message, rating },
    { new: true }
  );

  if (updated) {
    res.json(updated);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
};
