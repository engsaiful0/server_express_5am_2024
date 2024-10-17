// routes/studentRoutes.js

const express = require('express');
const { registerStudent, getStudent, deleteStudent, getAllStudents,updateStudentById } = require('../Controllers/StudentController'); // Import the controller function

const router = express.Router(); // Create a router instance

// Define the registration route
router.post('/register', registerStudent);

// GET route to fetch a student by ID
router.get('/:id', getStudent); // '/:id' is a route parameter to capture the student's ID

// DELETE route to delete a student by ID
router.delete('/:id', deleteStudent);  // Add this line for deleting students

// GET route to fetch all students
router.get('/', getAllStudents); // Add this line to get all students

// PUT route to update a student by ID
router.put('/:id', updateStudentById);  // Add this line for updating students


module.exports = router; // Export the router
