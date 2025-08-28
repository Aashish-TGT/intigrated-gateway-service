require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

const Admin = require('./models/Admin');
const Client = require('./models/Client');
const Receipt = require('./models/Receipt');

const adminRoutes = require('./routes/adminRoutes');
const clientRoutes = require('./routes/clientRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/clients', clientRoutes);

// Create a dummy client if not exists
sequelize.sync().then(async () => {
  await Client.findOrCreate({
    where: { email: 'test@example.com' },
    defaults: {
      name: 'Test Client',
      subscriptionUsed: 0,
      subscriptionLimit: 10,
      dueAmount: 0
    }
  }).then(([client, created]) => {
    console.log('Test client:', client.id, created ? 'created' : 'already exists');
  });

  app.listen(process.env.PORT, () => {
    console.log(`✅ Admin Panel running on port ${process.env.PORT}`);
  });
});
