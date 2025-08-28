class BillingController {
    constructor(stripeService, razorpayService, meterService, auditLogService) {
        this.stripeService = stripeService;
        this.razorpayService = razorpayService;
        this.meterService = meterService;
        this.auditLogService = auditLogService;
    }

    async createInvoice(req, res) {
        try {
            const { userId, amount, currency } = req.body;
            const invoice = await this.stripeService.createInvoice(userId, amount, currency);
            await this.auditLogService.logActivity(userId, 'Invoice created', invoice.id);
            res.status(201).json(invoice);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async checkPaymentStatus(req, res) {
        try {
            const { invoiceId } = req.params;
            const status = await this.stripeService.getPaymentStatus(invoiceId);
            res.status(200).json(status);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async manageUsageLimits(req, res) {
        try {
            const { userId } = req.params;
            const usage = await this.meterService.getUsage(userId);
            res.status(200).json(usage);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async sendOverageAlert(req, res) {
        try {
            const { userId } = req.params;
            const alert = await this.meterService.checkForOverage(userId);
            res.status(200).json(alert);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default BillingController;