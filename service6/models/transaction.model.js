module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define("Transaction", {
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING, // success, failed, pending
      allowNull: false
    },
    paymentMode: {
      type: DataTypes.STRING, // card, upi, cash, etc.
      allowNull: true
    },
    transactionDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  return Transaction;
};
