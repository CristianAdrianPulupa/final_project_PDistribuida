const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next(); // Tiene rol admin, continúa
  }

  return res.status(403).json({ message: 'Acceso denegado: solo administradores' });
};

module.exports = isAdmin;
