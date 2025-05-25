// // Backend/src/models/assets.js

// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const Asset = sequelize.define('Asset', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },

//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },

//   description: {
//     type: DataTypes.TEXT,
//     allowNull: true,
//   },

//   equipment_type_id: {
//     type: DataTypes.INTEGER,
//     allowNull: true,  // nullable for ON DELETE SET NULL foreign key
//     references: {
//       model: 'EquipmentTypes',
//       key: 'id',
//     },
//     onDelete: 'SET NULL',
//     onUpdate: 'CASCADE',
//   },

//   base_id: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//     references: {
//       model: 'Bases',
//       key: 'id',
//     },
//     onDelete: 'SET NULL',
//     onUpdate: 'CASCADE',
//   },

//   quantity: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     defaultValue: 1,
//   },

//   status: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     defaultValue: 'available',
//   }
// }, {
//   tableName: 'Assets',
//   timestamps: true,
// });

// module.exports = Asset;



// Backend/src/models/assets.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Asset = sequelize.define('Asset', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  equipment_type_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'EquipmentTypes',
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  base_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Bases',
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'available',
  }
}, {
  tableName: 'Assets',
  timestamps: true,
});

// ✅ Add this to define the hasMany association
Asset.associate = (models) => {
  Asset.hasMany(models.AssetMovement, {
    foreignKey: 'asset_id',
    as: 'movements'
  });
};

module.exports = Asset;
