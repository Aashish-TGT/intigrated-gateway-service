const { Transaction, Client } = require("../models");
const { Op } = require("sequelize");

// 🔍 Get transactions with filters
exports.getTransactions = async (req, res) => {
  try {
    const { clientId, status, from, to, page = 1, limit = 10 } = req.query;

    const where = {};
    if (clientId) where.clientId = clientId;
    if (status) where.status = status;
    if (from && to) {
      where.transactionDate = {
        [Op.between]: [new Date(from), new Date(to)]
      };
    }

    const offset = (page - 1) * limit;

    const transactions = await Transaction.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [{ model: Client, attributes: ["name", "email"] }],
      order: [["transactionDate", "DESC"]]
    });

    res.json({
      total: transactions.count,
      page: parseInt(page),
      limit: parseInt(limit),
      transactions: transactions.rows
    });
  } catch (err) {
    console.error("❌ Error fetching transactions:", err);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};
