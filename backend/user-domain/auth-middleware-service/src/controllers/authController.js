const jwt = require('jsonwebtoken');

const verifyToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ valid: true, decoded });
  } catch (err) {
    return res.status(401).json({ valid: false, message: 'Token inválido o expirado' });
  }
};

module.exports = { verifyToken };
