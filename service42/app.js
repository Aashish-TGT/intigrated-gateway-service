const express = require("express");
const dotenv = require("dotenv");
const mappingRoutes = require("./routes/mappingRoutes");
const esgRoutes = require("./routes/esgRoutes");
const connectDB = require("./utils/db");
const cors = require("cors");

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/v1/mapping", mappingRoutes);
app.use("/api/v1/esg", esgRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});