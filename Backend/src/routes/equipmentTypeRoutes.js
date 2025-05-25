// // src/routes/equipmentTypeRoutes.js
// const express = require('express');
// const router = express.Router();
// const { EquipmentType } = require('../models');

// router.get('/', async (req, res) => {
//   try {
//     const types = await EquipmentType.findAll();
//     res.json(types);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching equipment types', error: error.message });
//   }
// });

// router.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   await equipmentTypes.update(req.body, { where: { id } });
//   res.json({ message: 'Updated' });
// });

// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   await equipmentTypes.destroy({ where: { id } });
//   res.json({ message: 'Deleted' });
// });

// module.exports = router;

// src/routes/equipmentTypeRoutes.js

//======================================before access
const express = require('express');
const router = express.Router();
const { EquipmentType } = require('../models');
const authorize = require('../middleware/authorize');
// Get all equipment types
router.get('/', authorize(['Logistic Officer']), async (req, res) => {
  try {
    const types = await EquipmentType.findAll();
    res.json(types);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching equipment types', error: err.message });
  }
});

// Create a new equipment type
router.post('/', authorize(['Logistic Officer']), async (req, res) => {
  try {
    const { name, description } = req.body;
    const newType = await EquipmentType.create({ name, description });
    res.status(201).json(newType);
  } catch (err) {
    res.status(500).json({ message: 'Error creating equipment type', error: err.message });
  }
});

// Update an existing equipment type
router.put('/:id', authorize(['Logistic Officer']), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const [updated] = await EquipmentType.update({ name, description }, { where: { id } });

    if (updated) {
      const updatedType = await EquipmentType.findByPk(id);
      res.json(updatedType);
    } else {
      res.status(404).json({ message: 'Equipment type not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating equipment type', error: err.message });
  }
});

// Delete an equipment type
router.delete('/:id',authorize(['Logistic Officer']),  async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await EquipmentType.destroy({ where: { id } });

    if (deleted) {
      res.json({ message: 'Deleted successfully' });
    } else {
      res.status(404).json({ message: 'Equipment type not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting equipment type', error: err.message });
  }
});

module.exports = router;
