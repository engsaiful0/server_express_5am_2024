// controllers/studentController.js

const StudentDetails = require('../Models/StudentDetails'); // Import the Student model

const multer = require('multer'); // Import multer

// Configure multer storage and file naming
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // specify the directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // filename format: timestamp-originalname
    }
});

// Initialize multer with storage settings
const upload = multer({ storage: storage }).single('profileImage'); // Set field name for single file upload

const studentRegisterDetailsWithImage = async (req, res) => {
    // Handle image upload
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: 'Image upload failed', error: err.message });
        }

        // Extract fields from request body
        const { name, email, date, time, gender, hobbies, department } = req.body;

        // Validate that all required fields are provided
        if (!name || !email || !date || !time) {
            return res.status(400).json({ message: 'Please provide all required fields (name, email, date, time)' });
        }

        try {
            // Create a new student record with the provided details
            const newStudentDetails = new StudentDetails({
                name,
                email,
                date,
                time,
                gender,
                hobbies,
                department,
                profileImage: req.file ? req.file.path : null // Store uploaded file path
            });

            await newStudentDetails.save(); // Save the student to the database

            // Send a success response
            res.status(201).json({
                message: 'Student registration successful!',
                data: newStudentDetails,
            });
        } catch (error) {
            console.error('Error registering student:', error);
            res.status(500).json({ message: 'Error registering student', error: error.message });
        }
    });
};

const studentRegisterDetails = async (req, res) => {
    const { name, email, date, time,gender,hobbies,department  } = req.body;

    // Validate that all fields are provided
    if (!name || !email || !date || !time) {
        return res.status(400).json({ message: 'Please provide all required fields (name, email, date, time)' });
    }

    try {
        // Create a new student
        const newStudentDetails = new StudentDetails({ name, email, date, time,gender,hobbies,department });
        await newStudentDetails.save(); // Save the student to the database

        // Send a success response
        res.status(201).json({
            message: 'Student registration successful!',
            data: newStudentDetails,
        });
    } catch (error) {
        // Handle potential errors (e.g., duplicate email)
        console.error('Error registering student:', error);
        res.status(500).json({ message: 'Error registering student', error: error.message });
    }
};
const getAllRegistrationDetails = async (req, res) => {
    try {
        // Fetch all student records from the database
        const registrations = await StudentDetails.find();
        
        // Send success response with all registrations
        res.status(200).json({
            message: 'All registrations retrieved successfully!',
            data: registrations,
        });
    } catch (error) {
        // Handle any errors that occur during fetching
        console.error('Error fetching registrations:', error);
        res.status(500).json({ message: 'Error fetching registrations', error: error.message });
    }
};

module.exports = { studentRegisterDetails,studentRegisterDetailsWithImage,getAllRegistrationDetails }; // Export the function
