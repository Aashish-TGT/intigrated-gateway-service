// Import the in-memory transactions array
const transactions = require("../models/transactionStore");

exports.createTransaction = (req, res) => {
  const { deviceId, amount, mileage, unit, meter } = req.body;

  const transaction = {
    id: transactions.length + 1,
    deviceId,
    amount,
    mileage,
    unit,
    meter,
    createdAt: new Date()
  };

  transactions.push(transaction);

  res.status(201).json({ message: "Transaction recorded", receipt: transaction });
};
