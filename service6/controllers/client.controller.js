const { Client } = require("../models");

exports.updateClientPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { plan } = req.body;

    if (!plan) {
      return res.status(400).json({ message: "Plan is required" });
    }

    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    client.plan = plan;
    await client.save();

    res.json({ message: "Client plan updated", client });
  } catch (err) {
    console.error("❌ Error updating client plan:", err);
    res.status(500).json({ message: "Failed to update client plan" });
  }
};
