const express = require('express');
const router = express.Router();
const UserPersonalDetails = require('../models/UserPersonalDetails'); // Import Mongoose model

// Route to save user details
router.post('/save-user-details', async (req, res) => {
  try {
    const userDetails = new UserPersonalDetails(req.body);
    await userDetails.save();
    res.status(200).json({ success: true, message: 'User details saved successfully' });
  } catch (error) {
    console.error('Error saving user details:', error);
    res.status(500).json({ success: false, message: 'Failed to save user details' });
  }
});

module.exports = router;
