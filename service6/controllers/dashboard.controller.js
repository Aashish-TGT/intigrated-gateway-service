const { Client, Transaction, Log, ErrorLog } = require("../models");
const { Op } = require("sequelize");

exports.getSummary = async (req, res) => {
  try {
    const [totalClients, totalTransactions, totalLogs, totalErrors] =
      await Promise.all([
        Client.count(),
        Transaction.count(),
        Log.count(),
        ErrorLog.count()
      ]);

    // 📊 Weekly receipts data (last 7 days)
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);

    const weeklyData = await Transaction.findAll({
      where: {
        createdAt: {
          [Op.between]: [sevenDaysAgo, today]
        }
      },
      attributes: [
        [Transaction.sequelize.fn("DATE", Transaction.sequelize.col("createdAt")), "date"],
        [Transaction.sequelize.fn("COUNT", "*"), "count"]
      ],
      group: ["date"],
      order: [["date", "ASC"]]
    });

    // ⚠️ Error aggregation by type
    const errorTypes = await ErrorLog.findAll({
      attributes: [
        "source",
        [ErrorLog.sequelize.fn("COUNT", "*"), "count"]
      ],
      group: ["source"]
    });

    res.json({
      totalClients,
      totalTransactions,
      totalLogs,
      totalErrors,
      weeklyReceipts: weeklyData,
      errorSummary: errorTypes
    });
  } catch (err) {
    console.error("❌ Dashboard summary error:", err);
    res.status(500).json({ message: "Failed to fetch dashboard summary" });
  }
};
