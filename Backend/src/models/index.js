const { Sequelize, DataTypes, Op } = require('sequelize');

const sequelize = new Sequelize('military_asset', 'root', '190703', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: { // ✅ This is missing — add it
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: DataTypes.STRING,
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
  },
}, { timestamps: false });

const Base = sequelize.define('Base', {
  name: DataTypes.STRING,
  location: DataTypes.STRING,
}, { timestamps: false });

const EquipmentType = sequelize.define('EquipmentType', {
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
}, { timestamps: false });

const Asset = sequelize.define('Asset', {
  name: DataTypes.STRING,
  quantity: DataTypes.INTEGER,
  base_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  equipment_type_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, { timestamps: false });

const Assignment = sequelize.define('Assignment', {
  assigned_to: DataTypes.STRING,
  quantity: DataTypes.INTEGER,
  assigned_date: DataTypes.DATE,
  asset_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, { timestamps: false });

const AssetMovement = sequelize.define('AssetMovement', {
  movement_type: DataTypes.ENUM('purchase', 'transfer_in', 'transfer_out'),
  quantity: DataTypes.INTEGER,
  movement_date: DataTypes.DATE,
  asset_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, { timestamps: false });

const Expenditure = sequelize.define('Expenditure', {
  quantity: DataTypes.INTEGER,
  expended_date: DataTypes.DATE,
  asset_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, { timestamps: false });

const AuditLog = sequelize.define('AuditLog', {
  action: DataTypes.STRING,
  action_date: DataTypes.DATE,
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, { timestamps: false });

// Associations

Base.hasMany(Asset, { foreignKey: 'base_id', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Asset.belongsTo(Base, { foreignKey: 'base_id', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

EquipmentType.hasMany(Asset, { foreignKey: 'equipment_type_id', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Asset.belongsTo(EquipmentType, { foreignKey: 'equipment_type_id', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

Asset.hasMany(Assignment, { foreignKey: 'asset_id' });
Assignment.belongsTo(Asset, { foreignKey: 'asset_id' });

Asset.hasMany(AssetMovement, { foreignKey: 'asset_id' });
AssetMovement.belongsTo(Asset, { foreignKey: 'asset_id' });

Asset.hasMany(Expenditure, { foreignKey: 'asset_id', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Expenditure.belongsTo(Asset, { foreignKey: 'asset_id', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

User.hasMany(AuditLog, { foreignKey: 'user_id', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
AuditLog.belongsTo(User, { foreignKey: 'user_id', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

AssetMovement.belongsTo(Base, { as: 'from_base', foreignKey: 'from_base_id' });
AssetMovement.belongsTo(Base, { as: 'to_base', foreignKey: 'to_base_id' });

Base.hasMany(AssetMovement, { as: 'from_movements', foreignKey: 'from_base_id' });
Base.hasMany(AssetMovement, { as: 'to_movements', foreignKey: 'to_base_id' });

module.exports = {
  sequelize,
  Op,
  User,
  Base,
  EquipmentType,
  Asset,
  Assignment,
  AssetMovement,
  Expenditure,
  AuditLog,
};
