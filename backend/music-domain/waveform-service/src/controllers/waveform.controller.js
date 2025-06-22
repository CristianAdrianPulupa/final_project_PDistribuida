exports.generateWaveform = (req, res) => {
  const { audioTrack } = req.body;

  // Simulación de generación de forma de onda
  const waveform = {
    audioTrack,
    waveformPoints: [0, 5, 10, 4, 8, 2, 6],
    resolution: 'low',
    message: 'Forma de onda generada correctamente'
  };

  res.status(200).json(waveform);
};
