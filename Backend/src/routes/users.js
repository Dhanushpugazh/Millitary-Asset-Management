// routes/users.js

const express = require('express');
const router = express.Router();
const { User } = require('../models');
const authorize = require('../middleware/authorize');

router.get('/', authorize(['Base Commander']),async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
});

router.put('/:id', authorize(['Base Commander']),async (req, res) => {
  const { id } = req.params;
  await User.update(req.body, { where: { id } });
  res.json({ message: 'Updated' });
});

router.delete('/:id',authorize(['Base Commander']), async (req, res) => {
  const { id } = req.params;
  await User.destroy({ where: { id } });
  res.json({ message: 'Deleted' });
});

module.exports = router;
