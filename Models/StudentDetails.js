const mongoose = require('mongoose');

// Define the Student Schema
const studentDetailsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    date: { // Use Date type for dates
        type: Date,
        required: true
    },
    time: { // Store only the time part if needed; alternatively use Date
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    hobbies: { // Array of strings
        type: [String],
        required: true
    },
    department: {
        type: String,
        required: true
    },
    profileImage: { // Field to store the image path
        type: String,
        required: false // Set to false if image is optional
    }
});

// Export the Student model
module.exports = mongoose.model('StudentDetails', studentDetailsSchema);
