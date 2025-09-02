const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Client = require('./Client');

const Receipt = sequelize.define('Receipt', {
  receiptId: { type: DataTypes.STRING, unique: true },
  clientId: DataTypes.INTEGER,
  posId: DataTypes.STRING,
  datePrinted: DataTypes.DATE,
});

Receipt.belongsTo(Client, { foreignKey: 'clientId' });

module.exports = Receipt;
