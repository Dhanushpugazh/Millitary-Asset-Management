function authorize(allowedRoles) {
  return (req, res, next) => {
    // Assume you have the user role in req.user.role from your authentication middleware
    const userRole = req.user?.role?.toLowerCase();

    if (!userRole) {
      return res.status(401).json({ message: 'Unauthorized: Role missing' });
    }

    if (!allowedRoles.map(r => r.toLowerCase()).includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden: Access denied' });
    }

    next();
  };
}

module.exports = authorize;
