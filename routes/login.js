const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

// Sample user data (ideally, this should be stored securely)
const validUsername = process.env.SUPERUSERNAME;
const validPassword = process.env.SUPERPASSWORD;

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check username and password
  if (username === validUsername && password === validPassword) {
    // Set a session cookie upon successful login
    req.session.user = { username }; // Store user data in the session
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

module.exports = router;
