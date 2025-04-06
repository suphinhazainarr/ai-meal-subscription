const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();



const generateAccessToken = (user) =>{
  return jwt.sign({id: user._id , role: user.role}, process.env.JWT_SECRET,{
    expiresIn:"15m",  })
}

const generateRefreshToken = (user) => {
  return jwt.sign({id: user.id}, process.env.JWT_REFRESH_SECRET,{
    expiresIn: "7d",
  })
}


// Register Route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role = "user" } = req.body; // Default role

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword, role }); // Include role
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = generateAccessToken(user)

    // Return token and user details (excluding sensitive data)
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});


// routes/auth.js (temporary solution without middleware)
router.get('/me', async (req, res) => {
  try {
    // Temporary: Get user ID from query params (for testing only)
    const userId = req.query.userId;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID required' });
    }

    const user = await User.findById(userId)
      .select('-password')
      .lean();
      
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      subscription: user.subscription || false
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
