const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const dashboardRoutes = require('./routes/dashboardRoutes');
const assetsRoutes = require('./routes/assets');
const userRoutes = require('./routes/users');
const db = require('./models');
const app = express();
const assignmentRoutes = require('./routes/Assignments');
const baseRoutes = require('./routes/bases');
const equipmentTypeRoutes = require('./routes/equipmentTypeRoutes');
const expendituresRoutes = require('./routes/expenditures');
const auditLogsRoutes = require('./routes/AuditLogs');
const assetMovementsRoutes = require('./routes/assetMovements');
const authRoute = require('./routes/authRoute');


app.use(cors());
app.use(express.json());
app.use('/api/dashboard', dashboardRoutes);
app.use('/assets', assetsRoutes);
app.use('/users', userRoutes); 
app.use('/api/assignments', assignmentRoutes);
app.use('/api/bases', baseRoutes);  
app.use('/api/equipmenttypes', equipmentTypeRoutes); //changes made-
app.use('/api/assetmovements', assetMovementsRoutes);
app.use('/expenditures', expendituresRoutes);
app.use('/auditlogs', auditLogsRoutes);
app.use('/api/auth', authRoute);
app.use((req, res, next) => {
  const role = req.headers['x-user-role'];
  const username = req.headers['x-user-name'];
  if (role && username) {
    req.user = { role, username };
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized: Missing user info' });
  }
});


const PORT = process.env.PORT||5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

module.export=app;
// Sync DB and Models
sequelize.sync({ alter: true }).then(() => {
  console.log('🗄️ All models synced');
});
