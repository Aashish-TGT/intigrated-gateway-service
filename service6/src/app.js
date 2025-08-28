const express = require('express');
const bodyParser = require('body-parser');
const billingRoutes = require('./routes/billingRoutes');
const auditLogService = require('./services/auditLogService');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/billing', billingRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Middleware to log requests for audit purposes
app.use((req, res, next) => {
    auditLogService.logRequest(req);
    next();
});