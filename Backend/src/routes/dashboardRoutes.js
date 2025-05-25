// routes/dashboard.js

const express = require('express');
const router = express.Router();
const { sequelize, Op, AssetMovement, Assignment, Expenditure } = require('../models');

router.get('/', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'startDate and endDate query parameters are required' });
    }

    // Opening Balance: sum of purchases & transfers_in minus transfers_out and assigned/expenditures before startDate
    const openingBalanceQuery = `
      SELECT 
        COALESCE(SUM(CASE WHEN am.movement_type IN ('purchase', 'transfer_in') THEN am.quantity ELSE 0 END), 0)
        - COALESCE(SUM(CASE WHEN am.movement_type = 'transfer_out' THEN am.quantity ELSE 0 END), 0)
        - COALESCE((SELECT SUM(quantity) FROM Assignments WHERE assigned_date < :startDate), 0)
        - COALESCE((SELECT SUM(quantity) FROM Expenditures WHERE expended_date < :startDate), 0) AS openingBalance
      FROM AssetMovements am
      WHERE am.movement_date < :startDate
    `;

    const [openingResult] = await sequelize.query(openingBalanceQuery, {
      replacements: { startDate },
      type: sequelize.QueryTypes.SELECT,
    });

    // Closing Balance: same as opening but <= endDate
    const closingBalanceQuery = `
      SELECT 
        COALESCE(SUM(CASE WHEN am.movement_type IN ('purchase', 'transfer_in') THEN am.quantity ELSE 0 END), 0)
        - COALESCE(SUM(CASE WHEN am.movement_type = 'transfer_out' THEN am.quantity ELSE 0 END), 0)
        - COALESCE((SELECT SUM(quantity) FROM Assignments WHERE assigned_date <= :endDate), 0)
        - COALESCE((SELECT SUM(quantity) FROM Expenditures WHERE expended_date <= :endDate), 0) AS closingBalance
      FROM AssetMovements am
      WHERE am.movement_date <= :endDate
    `;

    const [closingResult] = await sequelize.query(closingBalanceQuery, {
      replacements: { endDate },
      type: sequelize.QueryTypes.SELECT,
    });

    // Net Movement between dates (purchases, transfer_in, transfer_out)
    const netMovementQuery = `
      SELECT
        COALESCE(SUM(CASE WHEN movement_type = 'purchase' THEN quantity ELSE 0 END), 0) AS purchases,
        COALESCE(SUM(CASE WHEN movement_type = 'transfer_in' THEN quantity ELSE 0 END), 0) AS transferIn,
        COALESCE(SUM(CASE WHEN movement_type = 'transfer_out' THEN quantity ELSE 0 END), 0) AS transferOut
      FROM AssetMovements
      WHERE movement_date BETWEEN :startDate AND :endDate
    `;

    const [netMovementResult] = await sequelize.query(netMovementQuery, {
      replacements: { startDate, endDate },
      type: sequelize.QueryTypes.SELECT,
    });

    // Assigned assets sum between dates
    const assignedSum = await Assignment.sum('quantity', {
      where: {
        assigned_date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    // Expended assets sum between dates
    const expendedSum = await Expenditure.sum('quantity', {
      where: {
        expended_date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    res.json({
      openingBalance: openingResult.openingBalance,
      closingBalance: closingResult.closingBalance,
      netMovement: netMovementResult,
      assigned: assignedSum || 0,
      expended: expendedSum || 0,
    });

  } catch (error) {
    console.error('Dashboard fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard data', error: error.message });
  }
});

module.exports = router;
