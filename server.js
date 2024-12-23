const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config(); // Load environment variables

// Ensure the dotenv file is correctly loaded
//console.log("JWT_SECRET_KEY in server.js: ", process.env.JWT_SECRET_KEY);  // Debug line to confirm loading

const mongoose = require('./config/db');
const studentRoutes = require('./Routes/studentRoutes');
const studentDetailsRoutes = require('./Routes/studentDetailsRoutes');
const authRoutes = require('./Routes/authRoutes'); // Import auth routes
const userRoutes = require('./Routes/userRoutes');
const paymentRoutes = require('./Routes/paymentRoutes');
const authMiddleware = require('./middleware/authMiddleware');

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/studentDetails', studentDetailsRoutes);
app.use('/api/auth', authRoutes); // Add authentication routes
app.use('/api/payments', paymentRoutes); // Use the payment routes

app.use('/api/user', authMiddleware, userRoutes); // User routes, protected by authMiddleware

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
