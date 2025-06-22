const express = require('express');
const router = express.Router();

// Simula una fusión de pistas/documentos
router.post('/merge', (req, res) => {
  const { tracks } = req.body;

  if (!tracks || !Array.isArray(tracks)) {
    return res.status(400).json({ message: 'Debe enviar una lista de tracks' });
  }

  const mergedTrack = `fusion-${Date.now()}.wav`;

  res.json({
    merged: true,
    mergedTrack,
    originalTracks: tracks,
    message: 'Pistas combinadas exitosamente'
  });
});

module.exports = router;
