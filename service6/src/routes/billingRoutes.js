const express = require('express');
const BillingController = require('../controllers/billingController');

const router = express.Router();
const billingController = new BillingController();

function setRoutes(app) {
    router.post('/invoices', billingController.createInvoice.bind(billingController));
    router.get('/payment-status/:invoiceId', billingController.checkPaymentStatus.bind(billingController));
    router.post('/usage-alerts', billingController.sendUsageAlerts.bind(billingController));

    app.use('/api/billing', router);
}

module.exports = setRoutes;