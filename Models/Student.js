const mongoose = require('mongoose');

// Define the Student Schema
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    subject: {
        type: String,
        required: true
    },
    messageDetails: {
        type: String,
        required: true
    }
});

// Export the Student model
module.exports = mongoose.model('Student', studentSchema);
