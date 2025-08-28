// app.js
import express from 'express';
import cors from 'cors';
import identityRoutes from './routes/identity.routes.js';
import { sequelize } from './config/db.config.js'; // Sequelize instance
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json()); // Parse JSON body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded body

// Routes
app.use('/api/identity', identityRoutes);

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Identity Service is running 🚀',
  });
});

// Database connection and server start
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');

    // Optionally sync models (WARNING: alter:true in prod can be risky)
    // await sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    process.exit(1); // Exit if DB connection fails
  }
})();
