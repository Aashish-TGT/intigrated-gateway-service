const express = require("express");
const app = express();

app.use(express.json());

// Routes
const voiceRoutes = require("./routes/voice.routes");
app.use("/api/voice", voiceRoutes);

module.exports = app;
