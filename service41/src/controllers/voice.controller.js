const { Op } = require("sequelize");
const Receipt = require("../models/Receipt");
const { parseQuery } = require("../services/nlu.service");
const { speakText } = require("../services/tts.service");

exports.searchReceipts = async (req, res) => {
  try {
    const queryText = req.body.query;
    const parsed = parseQuery(queryText);

    let where = {};
    if (parsed.store) where.store = parsed.store;
    if (parsed.month) {
      where.date = {
        [Op.between]: [
          new Date(2025, parsed.month - 1, 1),
          new Date(2025, parsed.month, 0),
        ],
      };
    }

    const receipts = await Receipt.findAll({ where });

    if (receipts.length === 0) {
      return res.json({ message: "No receipts found" });
    }

    // Optional voice summary
    const summary = `I found ${receipts.length} receipts. 
      First is from ${receipts[0].store} on ${receipts[0].date.toDateString()} 
      with amount ${receipts[0].amount} rupees.`;

    await speakText(summary);

    res.json({ receipts, summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
