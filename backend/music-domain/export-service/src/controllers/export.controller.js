const path = require('path');

exports.exportTrack = (req, res) => {
  const { format = 'mp3', trackName = 'demo-track' } = req.body;

  // Simula el nombre del archivo generado
  const exportedFile = `${trackName}-${Date.now()}.${format}`;
  const exportPath = path.join('/exports', exportedFile);

  res.status(200).json({
    success: true,
    exportedFile,
    path: exportPath,
    message: `Pista exportada exitosamente en formato .${format}`
  });
};
