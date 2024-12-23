// backend/controllers/paymentController.js
const Stripe = require('stripe');
require('dotenv').config();  // Load environment variables from .env

// Ensure the environment variable is loaded
console.log(process.env.STRIPE_SECRET_KEY);  // This should print the secret key or undefined if not loaded

const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Use the secret key from .env
const Payment = require('../Models/Payment');  // Payment model

// Controller function to create a payment intent
const createPaymentIntent = async (req, res) => {
    try {
        const { amount } = req.body; // Amount should be passed in the request body

        // Create a payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // Amount in the smallest currency unit (e.g., cents for USD)
            currency: 'usd', // Change currency if needed
            payment_method: 'pm_card_visa',
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never',
            },
        });
        console.log("paymentIntent status", paymentIntent.status);
        // Save payment details to MongoDB
        const payment = new Payment({
            paymentId: paymentIntent.id,
            amount,
            currency: 'usd', // Currency (USD in this case)
            status: paymentIntent.status,
            customerEmail:'saiful@gmail.com'
        });

        await payment.save(); // Save payment to MongoDB
        //console.log("clientSecret", paymentIntent.client_secret);
        // Return the client secret to the frontend
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createPaymentIntent };
