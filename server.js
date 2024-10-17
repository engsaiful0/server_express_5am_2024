const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('./config/db');
const studentRoutes = require('./Routes/studentRoutes');
// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/students', studentRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
