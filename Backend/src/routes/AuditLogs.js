// backend/src/routes/auditlogs.js
const express = require('express');
const router = express.Router();
const { AuditLog, User } = require('../models');

// GET /auditlogs - fetch all audit logs with user info
router.get('/', async (req, res) => {
  try {
    const logs = await AuditLog.findAll({
      include: {
        model: User,
        attributes: ['username', 'email']
      },
      order: [['action_date', 'DESC']],
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch audit logs', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  await auditlogs.update(req.body, { where: { id } });
  res.json({ message: 'Updated' });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await auditlogs.destroy({ where: { id } });
  res.json({ message: 'Deleted' });
});

module.exports = router;
