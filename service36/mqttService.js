const mqtt = require("mqtt");
const transactions = require("../models/transactionStore");

function initMQTT(wss) {
  const brokerURL = process.env.MQTT_BROKER || "mqtt://broker.hivemq.com";
  const client = mqtt.connect(brokerURL);

  client.on("connect", () => {
    console.log("✅ Connected to MQTT Broker:", brokerURL);
    client.subscribe("ev/charger/transactions", (err) => {
      if (err) {
        console.error("❌ MQTT subscription error:", err.message);
      } else {
        console.log("📡 Subscribed to topic: ev/charger/transactions");
      }
    });
  });

  client.on("message", (topic, message) => {
    try {
      const data = JSON.parse(message.toString());

      const transaction = {
        id: transactions.length + 1,
        ...data,
        createdAt: new Date()
      };

      transactions.push(transaction);
      console.log("🧾 Transaction stored:", transaction);

      // Broadcast to WebSocket dashboard
      if (wss) {
        wss.clients.forEach((client) => {
          if (client.readyState === 1) {
            client.send(JSON.stringify({
              type: "new-transaction",
              data: transaction
            }));
          }
        });
      }

    } catch (err) {
      console.error("❌ MQTT message processing error:", err.message);
    }
  });

  client.on("error", (err) => {
    console.error("❌ MQTT connection error:", err.message);
  });
}

module.exports = { initMQTT };
