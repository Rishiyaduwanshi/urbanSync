const jwt = require('jsonwebtoken');
const ProjectManager = require('../models/ProjectManager.model'); // or Administrator.model if needed
const bcrypt = require('bcrypt');

// Login function to authenticate user and generate a JWT token
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the project manager by email
    const user = await ProjectManager.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Check if the password matches (hashed comparison)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role }, // Payload with user's ID and role
      process.env.JWT_SECRET, // JWT Secret (from your .env)
      { expiresIn: '45h' } // Token expiration time
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login };