const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// POST endpoint to handle registration
app.post('/register', (req, res) => {
    const formData = req.body; // Get the form data from the request body

    // You can add your logic to save this data to a database here

    console.log('Received Registration Data:', formData); // Log the data to the console

    // Send a response back to the client
    res.status(201).json({
        message: 'Registration successful!',
        data: formData,
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
