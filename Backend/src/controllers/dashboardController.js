const { AssetMovement, Assignment, Expenditure } = require('../models');
const { Op } = require('sequelize');

exports.getDashboardMetrics = async (req, res) => {
  const { startDate, endDate, baseId, equipmentTypeId } = req.query;

  const whereBaseEquip = {};
  if (baseId) whereBaseEquip.baseId = baseId;
  if (equipmentTypeId) whereBaseEquip.equipmentTypeId = equipmentTypeId;

  try {
    const purchases = await AssetMovement.sum('quantity', {
      where: { ...whereBaseEquip, type: 'purchase' }
    });

    const transferIn = await AssetMovement.sum('quantity', {
      where: { ...whereBaseEquip, type: 'transfer_in' }
    });

    const transferOut = await AssetMovement.sum('quantity', {
      where: { ...whereBaseEquip, type: 'transfer_out' }
    });

    const assigned = await Assignment.sum('quantity', {
      where: whereBaseEquip
    });

    const expended = await Expenditure.sum('quantity', {
      where: whereBaseEquip
    });

    const netMovement = (purchases || 0) + (transferIn || 0) - (transferOut || 0);
    const closingBalance = netMovement - (assigned || 0) - (expended || 0);

    const openingBalance = closingBalance - netMovement;

    res.json({
      openingBalance,
      purchases,
      transferIn,
      transferOut,
      netMovement,
      assigned,
      expended,
      closingBalance
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Failed to load dashboard metrics' });
  }
};
