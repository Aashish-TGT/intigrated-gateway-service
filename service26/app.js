const express = require('express');
const dotenv = require('dotenv');
const importRoutes = require('./routes/import.routes');

dotenv.config();
const app = express();
app.use(express.json());
app.use('/upload', importRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`MS30 running on port ${PORT}`));
