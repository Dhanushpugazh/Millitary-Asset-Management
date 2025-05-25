// // // // const express = require('express');
// // // // const router = express.Router();
// // // // const jwt = require('jsonwebtoken');
// // // // const bcrypt = require('bcryptjs');
// // // // const { User } = require('../models');

// // // // const JWT_SECRET = 'your_jwt_secret'; // Replace with env var in production

// // // // router.post('/login', async (req, res) => {
// // // //   const { username, password } = req.body;

// // // //   const user = await User.findOne({ where: { username } });
// // // //   if (!user) return res.status(401).json({ message: 'Invalid credentials' });

// // // //   // Replace with hashed password logic if using bcrypt
// // // //   if (password !== user.password) return res.status(401).json({ message: 'Invalid credentials' });

// // // //   const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

// // // //   res.json({ token, role: user.role });
// // // // });

// // // // module.exports = router;
// // // // backend/src/routes/auth.js (or wherever you keep routes)

// // // const express = require('express');
// // // const bcrypt = require('bcryptjs');
// // // const { User } = require('../models'); // Sequelize User model

// // // const router = express.Router();

// // // router.post('/login', async (req, res) => {
// // //   const { username, password } = req.body;

// // //   try {
// // //     const user = await User.findOne({ where: { username } });
// // //     if (!user) return res.status(401).json({ message: 'Invalid credentials' });

// // //     const validPassword = await bcrypt.compare(password, user.password);
// // //     if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

// // //     // Only allow the three roles you want:
// // //     if (!['Admin', 'Base Commander', 'Logistic Officer'].includes(user.role)) {
// // //       return res.status(403).json({ message: 'Access denied' });
// // //     }

// // //     return res.json({ role: user.role, username: user.username });
// // //   } catch (error) {
// // //     console.error(error);
// // //     res.status(500).json({ message: 'Server error' });
// // //   }
// // // });

// // // module.exports = router;
// // // backend/src/routes/authRoute.js
// // // const express = require('express');
// // // const { User } = require('../models'); // Sequelize User model

// // // const router = express.Router();

// // // router.post('/login', async (req, res) => {
// // //   const { username, password } = req.body;

// // //   try {
// // //     const user = await User.findOne({ where: { username } });
// // //     if (!user) return res.status(401).json({ message: 'Invalid credentials' });

// // //     // Plain text password comparison
// // //     if (user.password !== password) {
// // //       return res.status(401).json({ message: 'Invalid credentials' });
// // //     }

// // //     // Only allow specific roles
// // //     const allowedRoles = ['Admin', 'Base Commander', 'Logistic Officer'];
// // //     if (!allowedRoles.includes(user.role)) {
// // //       return res.status(403).json({ message: 'Security breach: unauthorized role' });
// // //     }

// // //     return res.json({ role: user.role, username: user.username });
// // //   } catch (error) {
// // //     console.error(error);
// // //     res.status(500).json({ message: 'Server error' });
// // //   }
// // // });

// // // module.exports = router;
// // const express = require('express');
// // const router = express.Router();
// // const { User } = require('../models');  // your Sequelize User model

// // router.post('/login', async (req, res) => {
// //   const { username, password } = req.body;
// //   console.log('Login attempt:', username, password);

// //   try {
// //     const user = await User.findOne({ where: { username } });
// //     if (!user) {
// //       console.log('User not found');
// //       return res.status(401).json({ message: 'Invalid username or password' });
// //     }

// //     console.log('Found user:', user.username, user.password);

// //     if (user.password !== password) {
// //       console.log('Password mismatch');
// //       return res.status(401).json({ message: 'Invalid username or password' });
// //     }

// //     if (!['Admin', 'Base Commander', 'Logistic Officer'].includes(user.role)) {
// //       console.log('Role not allowed:', user.role);
// //       return res.status(403).json({ message: 'Access denied' });
// //     }

// //     console.log('Login successful for', username);
// //     return res.json({ role: user.role, username: user.username });
// //   } catch (error) {
// //     console.error('Login error:', error);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });

// // module.exports = router;

// // routes/auth.js (or wherever your login route is)

// const express = require('express');
// const router = express.Router();
// const { User } = require('../models');

// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ where: { username } });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid username or password' });
//     }

//     // Since password is plain text, simple comparison
//     if (user.password !== password) {
//       return res.status(401).json({ message: 'Invalid username or password' });
//     }

//     // Allow only specific roles
//     if (!['Admin', 'Base Commander', 'Logistic Officer'].includes(user.role)) {
//       return res.status(403).json({ message: 'Access denied' });
//     }

//     return res.json({ role: user.role, username: user.username });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;

// routes/auth.js
const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt:', username, password);

  try {
    const user = await User.findOne({
      where: { username },
      attributes: ['username', 'password', 'role']  // explicitly select password
    });

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    console.log('Found user:', user.username, user.password);

    if (user.password !== password) {
      console.log('Password mismatch');
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    if (!['Admin', 'Base Commander', 'Logistic Officer'].includes(user.role)) {
      console.log('Role not allowed:', user.role);
      return res.status(403).json({ message: 'Access denied' });
    }

    console.log('Login successful for', username);
    return res.json({ role: user.role, username: user.username });
  } 
    catch (error) {
    console.error('Login error:', error); // Keep this line
    res.status(500).json({ message: 'Server error', error: error.message });
}

});

module.exports = router;
