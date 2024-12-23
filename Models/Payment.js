const mongoose = require('mongoose');

// Define the Payment Schema
const paymentSchema = new mongoose.Schema(
    {
        paymentId: { type: String, required: true }, // Stripe Payment Intent ID
        amount: { type: Number, required: true }, // Payment amount in cents
        currency: { type: String, required: true }, // Payment currency (e.g., USD)
        status: { type: String, required: true }, // Payment status (e.g., succeeded, pending)
        customerEmail: { type: String, required: true }, // Customer's email
        createdAt: { type: Date, default: Date.now }, // Payment creation timestamp
    },
    { timestamps: true } // Automatically add `createdAt` and `updatedAt`
);

// Export the Payment model
module.exports = mongoose.model('Payment', paymentSchema);
