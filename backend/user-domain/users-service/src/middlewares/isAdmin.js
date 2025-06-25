const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next(); // Has admin role, continues
  }

  return res.status(403).json({ message: 'Access denied: admins only' });
};

module.exports = isAdmin;
