// db.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import IdentityModel from './models/identity.model.js';
import ConsentModel from './models/consent.model.js';

dotenv.config(); // Load .env variables

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false, // Disable SQL query logs
  }
);

const db = {};

// Sequelize connection
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.Identity = IdentityModel(sequelize, Sequelize.DataTypes);
db.Consent = ConsentModel(sequelize, Sequelize.DataTypes);

// Database connection + sync
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully.');

    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: false }); // change to true for auto table updates in dev
      console.log('✅ Models synced.');
    }
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
  }
})();

export default db; // default import
export const { Identity, Consent } = db; // named imports
