
const express = require('express');
const router = express.Router();
const { Asset, Assignment, AssetMovement } = require('../models');

// GET all assets with related assignments and movements
router.get('/', async (req, res) => {
  try {
    const assets = await Asset.findAll({
      attributes: ['id', 'name', 'quantity', 'base_id', 'equipment_type_id'],
      include: [
        {
          model: Assignment,
          attributes: [
            'id', 
            'assigned_to', 
            ['quantity', 'assigned_quantity'], 
            'assigned_date'
          ],
          required: false,
        },
        {
          model: AssetMovement,
          attributes: [
            'id', 
            'movement_type', 
            ['quantity', 'movement_quantity'], 
            'movement_date'
          ],
          required: false,
        },
      ],
    });

    res.json(assets);
  } catch (err) {
    console.error('Error fetching assets:', err);
    res.status(500).json({ message: 'Error fetching assets', error: err.message });
  }
});

// CREATE a new asset
router.post('/', async (req, res) => {
  try {
    const asset = await Asset.create(req.body);
    res.status(201).json(asset);
  } catch (err) {
    res.status(400).json({ message: 'Error creating asset', error: err.message });
  }
});

// UPDATE an asset
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Asset.update(req.body, { where: { id } });
    if (updated[0] === 0) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    const asset = await Asset.findByPk(id);
    res.json(asset);
  } catch (err) {
    res.status(400).json({ message: 'Error updating asset', error: err.message });
  }
});

// DELETE an asset
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Asset.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting asset', error: err.message });
  }
});

module.exports = router;
