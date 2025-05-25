
const express = require('express');
const router = express.Router();
const { AssetMovement, Base } = require('../models');
const authorize = require('../middleware/authorize');

router.get('/', authorize(['Logistic Officer']), async (req, res) => {
  try {
    const movements = await AssetMovement.findAll({
      include: [
        { model: Base, as: 'from_base', attributes: ['id', 'name'] },
        { model: Base, as: 'to_base', attributes: ['id', 'name'] }
      ]
    });
    res.json(movements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching asset movements', error: error.message });
  }
});

// Create asset movement
router.post('/',authorize(['Logistic Officer']), async (req, res) => {
  try {
    const newMovement = await AssetMovement.create(req.body);
    res.status(201).json(newMovement);
  } catch (error) {
    res.status(500).json({ message: 'Error creating asset movement', error: error.message });
  }
});

// Update asset movement
router.put('/:id',authorize(['Logistic Officer']), async (req, res) => {
  const { id } = req.params;
  try {
    await AssetMovement.update(req.body, { where: { id } });
    res.json({ message: 'Updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating asset movement', error: error.message });
  }
});

// Delete asset movement
router.delete('/:id', authorize(['Logistic Officer']), async (req, res) => {
  const { id } = req.params;
  try {
    await AssetMovement.destroy({ where: { id } });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting asset movement', error: error.message });
  }
});

module.exports = router;
