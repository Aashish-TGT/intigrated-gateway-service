// app.js

// Import express framework
const express = require('express');
const app = express();

// Import route handlers for tenants and users
const tenantRoutes = require('./routes/tenant.routes');
const userRoutes = require('./routes/user.routes');

// Middleware to parse incoming JSON requests
app.use(express.json());

/**
 * Routes
 * All endpoints under /api/tenants and /api/users
 * will be handled by their respective route files.
 */
app.use('/api/tenants', tenantRoutes); // e.g. POST /api/tenants
app.use('/api/users', userRoutes);     // e.g. POST /api/users/register

// Export the app so it can be used in server.js
module.exports = app;
