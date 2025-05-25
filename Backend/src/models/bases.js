// routes/bases.js

const express = require('express');
const router = express.Router();
const { Base } = require('.');

router.get('/', async (req, res) => {
  try {
    const bases = await Base.findAll();
    res.json(bases);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bases', error: err.message });
  }
});

module.exports = router;
