// // Backend/src/models/assetMovements.js

// const { DataTypes } = require('sequelize');
// const { sequelize } = require('./index');

// AssetMovement.belongsTo(models.Asset, { as: 'asset', foreignKey: 'asset_id' });
// AssetMovement.belongsTo(models.Base, { as: 'from_base', foreignKey: 'from_base_id' });
// AssetMovement.belongsTo(models.Base, { as: 'to_base', foreignKey: 'to_base_id' });

// const AssetMovement = sequelize.define('AssetMovement', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   asset_id: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//     references: {
//       model: 'Assets',
//       key: 'id',
//     },
//     onDelete: 'SET NULL',
//     onUpdate: 'CASCADE',
//   },
//   from_location: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   to_location: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   movement_date: {
//     type: DataTypes.DATE,
//     allowNull: false,
//   },
//   remarks: {
//     type: DataTypes.TEXT,
//     allowNull: true,
//   }
// }, {
//   tableName: 'AssetMovements',
//   timestamps: true, // This must stay true if you want createdAt/updatedAt
// });




// Backend/src/models/assetMovements.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const AssetMovement = sequelize.define('AssetMovement', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  asset_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  from_location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  to_location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  movement_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  remarks: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  tableName: 'AssetMovements',
  timestamps: true,
});

// ✅ Add this to define the belongsTo association
AssetMovement.associate = (models) => {
  AssetMovement.belongsTo(models.Asset, {
    foreignKey: 'asset_id',
    as: 'asset'
  });
};

AssetMovement.associate = (models) => {
  AssetMovement.belongsTo(models.Base, { as: 'from_base', foreignKey: 'from_base_id' });
  AssetMovement.belongsTo(models.Base, { as: 'to_base', foreignKey: 'to_base_id' });
  AssetMovement.belongsTo(models.Asset, { foreignKey: 'asset_id' });
};

module.exports = AssetMovement;
