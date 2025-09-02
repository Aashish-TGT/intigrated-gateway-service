const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Receipt = sequelize.define("Receipt", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  store: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
}, {
  tableName: "receipts",
  timestamps: false,
});

module.exports = Receipt;
