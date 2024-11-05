
const express = require('express');
const { studentRegisterDetails,studentRegisterDetailsWithImage } = require('../Controllers/StudentDetailsController'); // Import the controller function

const router = express.Router(); // Create a router instance

// Define the registration route
router.post('/studentRegisterDetails', studentRegisterDetails);
router.post('/studentRegisterDetailsWithImage', studentRegisterDetailsWithImage);

module.exports = router; // Export the router
