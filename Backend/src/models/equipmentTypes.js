// routes/equipmentTypes.js

const express = require('express');
const router = express.Router();
const { EquipmentType } = require('.');

router.get('/', async (req, res) => {
  try {
    const types = await EquipmentType.findAll();
    res.json(types);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching equipment types', error: err.message });
  }
});

module.exports = router;
