// // routes/users.js

// const User = sequelize.define('User', {
//   username: { type: Sequelize.STRING },
//   password: { type: Sequelize.STRING },
//   role: { type: Sequelize.STRING },
//   email: { type: Sequelize.STRING },
// });

// // Get all users
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.findAll();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching users', error: err.message });
//   }
// });

// module.exports = router;
// models/User.js
// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // adjust path

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING },
}, {
  tableName: 'Users',
  timestamps: false,
});

module.exports = User;
