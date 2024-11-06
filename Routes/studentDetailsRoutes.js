
const express = require('express');
const { studentRegisterDetails,studentRegisterDetailsWithImage,getAllRegistrationDetails } = require('../Controllers/StudentDetailsController'); // Import the controller function

const router = express.Router(); // Create a router instance

// Define the registration route
router.post('/studentRegisterDetails', studentRegisterDetails);
router.post('/studentRegisterDetailsWithImage', studentRegisterDetailsWithImage);
router.get('/getAllRegistrationDetails', getAllRegistrationDetails);

module.exports = router; // Export the router
