const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200', // Your Angular dev server
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// Import routes
const authRoutes = require("./routes/auth");
const paymentRoutes = require("./routes/payment"); // Import payment routes
const mealRoutes = require('./routes/mealRoutes');
app.use('/api', mealRoutes);
// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes); // Use payment routes

const userDetails = require('./routes/userPersonalDetails')
app.use("/api/user", userDetails);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI) // No need for options
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
