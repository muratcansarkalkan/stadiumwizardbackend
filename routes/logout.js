const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).send('Error logging out');
      }
      // Session destroyed successfully, user is logged out
      res.clearCookie('connect.sid'); // Clear the session cookie
      res.status(200).send('Logged out successfully');
    });
  });
  
module.exports = router;