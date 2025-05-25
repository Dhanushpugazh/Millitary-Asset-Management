// const express = require('express');
// const router = express.Router();
// const { Base } = require('../models');

// // GET all bases
// router.get('/', async (req, res) => {
//   try {
//     const bases = await Base.findAll();
//     res.json(bases);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching bases', error: err.message });
//   }
// });

// // POST a new base
// router.post('/', async (req, res) => {
//   try {
//     const { name, location } = req.body;
//     const newBase = await Base.create({ name, location });
//     res.status(201).json(newBase);
//   } catch (err) {
//     res.status(500).json({ message: 'Error creating base', error: err.message });
//   }
// });

// router.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   await bases.update(req.body, { where: { id } });
//   res.json({ message: 'Updated' });
// });

// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   await bases.destroy({ where: { id } });
//   res.json({ message: 'Deleted' });
// });

// module.exports = router;
//====================================before
const express = require('express');
const router = express.Router();
const { Base } = require('../models');
const authorize = require('../middleware/authorize');
// GET all bases
router.get('/', async (req, res) => {
  try {
    const bases = await Base.findAll();
    res.json(bases);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bases', error: err.message });
  }
});

// CREATE a new base
router.post('/', authorize(['Base Commander']),async (req, res) => {
  try {
    const { name, location } = req.body;
    const newBase = await Base.create({ name, location });
    res.status(201).json(newBase);
  } catch (err) {
    res.status(500).json({ message: 'Error creating base', error: err.message });
  }
});

// UPDATE a base
router.put('/:id',authorize(['Base Commander']), async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Base.update(req.body, { where: { id } });
    if (updated) {
      const updatedBase = await Base.findByPk(id);
      res.json(updatedBase);
    } else {
      res.status(404).json({ message: 'Base not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating base', error: err.message });
  }
});

// DELETE a base
router.delete('/:id',authorize(['Base Commander']), async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Base.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'Base deleted' });
    } else {
      res.status(404).json({ message: 'Base not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting base', error: err.message });
  }
});

module.exports = router;
