const express = require('express');
const { login } = require('../handlers/auth.handler');
const router = express.Router();

// POST route for login to generate token
router.post('/api/login', login);

module.exports = router;