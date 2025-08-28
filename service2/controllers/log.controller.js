const { Log } = require("../models");
const { Op } = require("sequelize");

// 🔍 GET logs with pagination and filters
exports.getLogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, type, source } = req.query;

    const where = {};
    if (type) where.type = type;
    if (source) where.source = source;

    const offset = (page - 1) * limit;

    const logs = await Log.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["timestamp", "DESC"]]
    });

    res.json({
      total: logs.count,
      page: parseInt(page),
      limit: parseInt(limit),
      logs: logs.rows
    });
  } catch (err) {
    console.error("❌ Error fetching logs:", err);
    res.status(500).json({ message: "Failed to fetch logs" });
  }
};
