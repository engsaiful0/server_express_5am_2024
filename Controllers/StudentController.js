// controllers/studentController.js

const Student = require('../Models/Student'); // Import the Student model

// Function to register a new student
const registerStudent = async (req, res) => {
    const { name, email, subject, messageDetails } = req.body;

    // Validate that all fields are provided
    if (!name || !email || !subject || !messageDetails) {
        return res.status(400).json({ message: 'Please provide all required fields (name, email, subject, messageDetails)' });
    }

    try {
        // Create a new student
        const newStudent = new Student({ name, email, subject, messageDetails });
        await newStudent.save(); // Save the student to the database

        // Send a success response
        res.status(201).json({
            message: 'Student registration successful!',
            data: newStudent,
        });
    } catch (error) {
        // Handle potential errors (e.g., duplicate email)
        console.error('Error registering student:', error);
        res.status(500).json({ message: 'Error registering student', error: error.message });
    }
};

// Function to get a single student by ID
const getStudent = async (req, res) => {
    try {
        const studentId = req.params.id; // Get student ID from request parameters
        const student = await Student.findById(studentId); // Find the student by ID

        if (!student) {
            return res.status(404).json({
                message: 'Student not found!',
            });
        }

        res.status(200).json({
            message: 'Student found!',
            data: student,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error!',
            error: error.message,
        });
    }
};


// Function to delete a student by ID
const deleteStudent = async (req, res) => {
    const studentId = req.params.id;  // Get the student ID from the route parameters

    try {
        // Find and delete the student by ID
        const deletedStudent = await Student.findByIdAndDelete(studentId);

        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found!' });
        }

        // Send success response after deletion
        res.status(200).json({
            message: 'Student deleted successfully!',
            data: deletedStudent,
        });
    } catch (error) {
        // Handle errors
        console.error('Error deleting student:', error);
        res.status(500).json({
            message: 'Server error while deleting student!',
            error: error.message,
        });
    }
};

// Function to get all students
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find(); // Retrieve all students from the database

        // If no students found
        if (students.length === 0) {
            return res.status(404).json({
                message: 'No students found!',
            });
        }

        // Send success response with all students
        res.status(200).json({
            message: 'All students retrieved successfully!',
            data: students,
        });
    } catch (error) {
        // Handle potential errors
        console.error('Error retrieving students:', error);
        res.status(500).json({
            message: 'Server error while retrieving students!',
            error: error.message,
        });
    }
};
// Function to update a student by ID
const updateStudentById = async (req, res) => {
    const studentId = req.params.id; // Get student ID from request parameters
    const { name, email, subject, messageDetails } = req.body; // Get updated data from request body

    try {
        // Find the student by ID and update it with the provided data
        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            { name, email, subject, messageDetails },
            { new: true, runValidators: true } // Options: return the updated document and run schema validations
        );

        // If student is not found
        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found!' });
        }

        // Send a success response with the updated student
        res.status(200).json({
            message: 'Student updated successfully!',
            data: updatedStudent,
        });
    } catch (error) {
        // Handle errors (e.g., validation errors, database errors)
        console.error('Error updating student:', error);
        res.status(500).json({
            message: 'Server error while updating student!',
            error: error.message,
        });
    }
};


module.exports = { registerStudent,getStudent,deleteStudent, getAllStudents,updateStudentById }; // Export the function
