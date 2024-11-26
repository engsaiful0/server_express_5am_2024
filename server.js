const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config(); // Load environment variables
const mongoose = require('./config/db');
const studentRoutes = require('./Routes/studentRoutes');
const studentDetailsRoutes = require('./Routes/studentDetailsRoutes');
const authRoutes = require('./Routes/authRoutes'); // Import auth routes

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/studentDetails', studentDetailsRoutes);
app.use('/api/auth', authRoutes); // Add authentication routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
