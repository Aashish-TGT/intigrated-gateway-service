const express = require("express");
require("dotenv").config();
const app = express();

app.use(express.json());

const mobileRoutes = require('./routes/mobile');
app.use('/mobile', mobileRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Mobile Gateway running on ${PORT}`));

