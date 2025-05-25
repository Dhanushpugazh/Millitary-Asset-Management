const { AssetMovement } = require('../models');

exports.getAllAssetMovements = async (req, res) => {
  try {
    const movements = await AssetMovement.findAll();
    res.json(movements);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching asset movements', error: err.message });
  }
};

exports.createAssetMovement = async (req, res) => {
  try {
    const newMovement = await AssetMovement.create(req.body);
    res.status(201).json(newMovement);
  } catch (err) {
    res.status(500).json({ message: 'Error creating asset movement', error: err.message });
  }
};

exports.updateAssetMovement = async (req, res) => {
  try {
    await AssetMovement.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating asset movement', error: err.message });
  }
};

exports.deleteAssetMovement = async (req, res) => {
  try {
    await AssetMovement.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting asset movement', error: err.message });
  }
};
