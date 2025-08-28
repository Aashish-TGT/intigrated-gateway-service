const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Client = sequelize.define('Client', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  subscriptionUsed: DataTypes.INTEGER,
  subscriptionLimit: DataTypes.INTEGER,
  dueAmount: DataTypes.FLOAT,
});

module.exports = Client;
