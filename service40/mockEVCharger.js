const mqtt = require("mqtt");

// Connect to MQTT Broker
const client = mqtt.connect("mqtt://broker.hivemq.com"); // or use process.env.MQTT_BROKER

// Function to generate random mock EV charger data
function generateMockEVTransaction() {
  return {
    deviceId: "EVCHARGER-" + Math.floor(Math.random() * 1000),
    amount: +(Math.random() * 100 + 50).toFixed(2),
    mileage: `${Math.floor(Math.random() * 100000)} km`,
    unit: "kWh",
    meter: "MTR-" + Math.floor(Math.random() * 999999).toString().padStart(6, "0"),
    createdAt: new Date()
  };
}

// On MQTT connection, publish every 10 seconds
client.on("connect", () => {
  console.log("🚀 Connected to MQTT Broker");

  setInterval(() => {
    const data = generateMockEVTransaction();
    const payload = JSON.stringify(data);
    client.publish("ev/charger/transactions", payload); // topic name
    console.log("📤 Published to MQTT:", data);
  }, 10000);
});
