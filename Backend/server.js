const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/assets', require('./routes/assets'));
app.use('/api/assignments', require('./routes/assignments'));
app.use('/api/bases', require('./routes/bases'));
app.use('/api/auditlogs', require('./routes/auditlogs'));
app.use('/api/equipmenttypes', require('./routes/equipmenttypes'));
app.use('/api/assetmovements', require('./routes/assetmovements'));
app.use('/api/expenditures', require('./routes/expenditures'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to sync DB:', err);
});
