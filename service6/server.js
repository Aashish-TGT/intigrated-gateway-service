const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./models");

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

// 🔗 Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/clients", require("./routes/client.routes"));
app.use("/api/analytics", require("./routes/analytics.routes")); // ✅ Added
app.use("/api/logs", require("./routes/log.routes"));
app.use("/api/transactions", require("./routes/transaction.routes"));
app.use("/api/errors", require("./routes/error.routes"));
app.use("/api/dashboard", require("./routes/dashboard.routes"));

// DB Sync and Server Start
db.sequelize.sync({ alter: true }).then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log("✅ Backend running on port", process.env.PORT);
  });
}).catch((err) => {
  console.error("❌ DB sync error:", err);
});
