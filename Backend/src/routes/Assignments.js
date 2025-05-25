const express = require('express');
const router = express.Router();
const { Assignment, Asset } = require('../models');
const authorize = require('../middleware/authorize');
router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.findAll({
      include: [
        {
          model: Asset,
          attributes: ['id', 'name']
        }
      ]
    });
    res.json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ message: 'Failed to fetch assignments', error: error.message });
  }
});

// POST new assignment
router.post('/', async (req, res) => {
  try {
    const assignment = await Assignment.create(req.body);
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create assignment', error: err.message });
  }
});

// PUT update assignment
router.put('/:id', async (req, res) => {
  try {
    await Assignment.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Assignment updated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update assignment', error: err.message });
  }
});

// DELETE assignment
router.delete('/:id', async (req, res) => {
  try {
    await Assignment.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Assignment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete assignment', error: err.message });
  }
});

module.exports = router;
