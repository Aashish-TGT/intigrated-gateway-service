const { ErrorLog } = require("../models");
const { Op } = require("sequelize");

exports.getErrors = async (req, res) => {
  try {
    const { source, from, to, page = 1, limit = 10 } = req.query;

    const where = {};
    if (source) where.source = source;
    if (from && to) {
      where.timestamp = {
        [Op.between]: [new Date(from), new Date(to)]
      };
    }

    const offset = (page - 1) * limit;

    const errors = await ErrorLog.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["timestamp", "DESC"]]
    });

    res.json({
      total: errors.count,
      page: parseInt(page),
      limit: parseInt(limit),
      errors: errors.rows
    });
  } catch (err) {
    console.error("❌ Error fetching error logs:", err);
    res.status(500).json({ message: "Failed to fetch error logs" });
  }
};
