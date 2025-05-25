// backend/src/routes/expenditures.js
const express = require('express');
const router = express.Router();
const { Expenditure } = require('../models');
const authorize = require('../middleware/authorize');
router.get('/', authorize(['Logistic Officer']), async (req, res) => {
  try {
    const expenditures = await Expenditure.findAll();
    res.json(expenditures);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenditures', error: error.message });
  }
});
router.put('/:id',authorize(['Logistic Officer']),  async (req, res) => {
  const { id } = req.params;
  await expenditures.update(req.body, { where: { id } });
  res.json({ message: 'Updated' });
});

router.delete('/:id',authorize(['Logistic Officer']),  async (req, res) => {
  const { id } = req.params;
  await expenditures.destroy({ where: { id } });
  res.json({ message: 'Deleted' });
});

module.exports = router;
