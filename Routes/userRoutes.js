
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../Models/User');
const router = express.Router();

// Profile Route (Protected)
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
