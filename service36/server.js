const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const dotenv = require("dotenv");
const path = require("path");

const deviceRoutes = require("./routes/deviceRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const mqttService = require("./services/mqttService");

dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/devices", deviceRoutes);
app.use("/api/transactions", transactionRoutes);

mqttService.initMQTT(wss);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});