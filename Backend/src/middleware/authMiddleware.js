module.exports = function requireRole(role) {
  return (req, res, next) => {
    const user = req.user; // from auth middleware (JWT/session)
    if (user.role !== role) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
};
