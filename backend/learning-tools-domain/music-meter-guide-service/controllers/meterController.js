const Meter = require('../models/Meter');

exports.getAllMeters = async (req, res) => {
  try {
    const meters = await Meter.find();
    res.json(meters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createMeter = async (req, res) => {
  const meter = new Meter(req.body);
  try {
    const newMeter = await meter.save();
    res.status(201).json(newMeter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateMeter = async (req, res) => {
  try {
    const updated = await Meter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Meter no encontrado" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMeter = async (req, res) => {
  try {
    const deleted = await Meter.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Meter no encontrado" });
    res.json({ message: "Meter eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
