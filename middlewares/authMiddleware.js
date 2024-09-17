const jwt = require('jsonwebtoken');
const User = require('../models/Administrator.model'); // Adjust the path as necessary

// Middleware to verify JWT tokens
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ status: 'Error', message: 'No token provided' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: 'Error', message: 'Failed to authenticate token' });
    }
    
    req.user = decoded;
    next();
  });
};

// Middleware to authorize admin access
const authorizeAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id); // Assuming user ID is in the token

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ status: 'Error', message: 'Access denied' });
    }

    next();
  } catch (err) {
    res.status(500).json({ status: 'Error', message: 'Failed to authorize user: ' + err.message });
  }
};

// Middleware to authorize roles
const authorizeRoles = (roles = []) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id); // Assuming user ID is in the token

      if (!user || !roles.includes(user.role)) {
        return res.status(403).json({ status: 'Error', message: 'Access denied' });
      }

      next();
    } catch (err) {
      res.status(500).json({ status: 'Error', message: 'Failed to authorize user: ' + err.message });
    }
  };
};

module.exports = {
  verifyToken,
  authorizeAdmin,
  authorizeRoles,
};