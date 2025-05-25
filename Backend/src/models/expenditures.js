
// routes/expenditures.js

const express = require('express');
const router = express.Router();
const { Expenditure, Asset } = require('.');

router.get('/', async (req, res) => {
  try {
    const expenditures = await Expenditure.findAll({
      include: [{ model: Asset, attributes: ['id', 'name'] }],
    });
    res.json(expenditures);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching expenditures', error: err.message });
  }
});

module.exports = router;
