const stripe = require('stripe')(process.env.API_KEY_STRIPE);

const createCharge = async (amount, currency, source) => {
    try {
        const charge = await stripe.charges.create({
            amount,
            currency,
            source,
        });
        return charge;
    } catch (error) {
        throw new Error(`Charge creation failed: ${error.message}`);
    }
};

const createSubscription = async (customerId, priceId) => {
    try {
        const subscription = await stripe.subscriptions.create({
            customer: customerId,
            items: [{ price: priceId }],
        });
        return subscription;
    } catch (error) {
        throw new Error(`Subscription creation failed: ${error.message}`);
    }
};

const retrievePaymentIntent = async (paymentIntentId) => {
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        return paymentIntent;
    } catch (error) {
        throw new Error(`Payment intent retrieval failed: ${error.message}`);
    }
};

module.exports = {
    createCharge,
    createSubscription,
    retrievePaymentIntent,
};