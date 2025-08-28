const { Receipt, Log } = require("../models");
const { Op, fn, col, literal } = require("sequelize");

exports.getSummary = async (req, res) => {
  try {
    const today = new Date();
    const last7 = new Date();
    last7.setDate(today.getDate() - 7);

    // 🧾 Count Receipts per Day (Last 7 Days)
    const receiptsPerDay = await Receipt.findAll({
      attributes: [
        [fn('DATE', col('createdAt')), 'date'],
        [fn('COUNT', col('id')), 'count']
      ],
      where: {
        createdAt: {
          [Op.gte]: last7
        }
      },
      group: [literal('DATE(createdAt)')],
      order: [[literal('DATE(createdAt)'), 'ASC']]
    });

    // ⚠️ Count Errors by Type
    const errors = await Log.findAll({
      attributes: [
        'type',
        [fn('COUNT', col('id')), 'count']
      ],
      where: {
        level: 'error'
      },
      group: ['type']
    });

    res.json({
      message: "Analytics summary fetched",
      receiptsPerDay,
      errors
    });
  } catch (err) {
    console.error("❌ Analytics summary error:", err);
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
};
