const mongoose = require("mongoose");

const esgMetricSchema = new mongoose.Schema({
  tenantId: { type: String, required: true },
  period: {
    from: { type: Date, required: true },
    to: { type: Date, required: true }
  },
  paperSaved: Number,
  co2Saved: Number,
  treesSaved: Number,
  esgScore: {
    Environmental: Number,
    Social: Number,
    Governance: Number
  },
  sdgGoals: [Number]
}, { timestamps: true });

module.exports = mongoose.model("EsgMetric", esgMetricSchema);
