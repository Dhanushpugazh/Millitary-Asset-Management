// Backend/src/models/assignments.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Assignment = sequelize.define('Assignment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  asset_id: {
    type: DataTypes.INTEGER,
    allowNull: true,  // must be nullable for ON DELETE SET NULL
    references: {
      model: 'Assets',
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },

  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },

  assigned_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  return_date: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  tableName: 'Assignments',
  timestamps: true,
});

module.exports = Assignment;
