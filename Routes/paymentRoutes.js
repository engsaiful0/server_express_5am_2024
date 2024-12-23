const express = require('express');
const { createPaymentIntent } = require('../Controllers/PaymentController'); // Import the controller function

const router = express.Router(); // Create a router instance

// POST route to create a payment intent
router.post('/create-payment-intent', createPaymentIntent);

module.exports = router; // Export the router
