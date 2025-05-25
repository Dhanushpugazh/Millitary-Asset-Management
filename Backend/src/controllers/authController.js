const { User } = require('../models'); // adjust path if needed
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) return res.status(401).json({ message: 'Invalid username or password' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Invalid username or password' });

    const allowedRoles = ['admin', 'commander', 'logistics'];
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: 'Access denied for this user role' });
    }

    return res.json({ role: user.role, username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
