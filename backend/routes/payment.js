const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const router = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Use environment variable for Razorpay key
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Use environment variable for Razorpay secret
});


// MongoDB Models
const Payment = require("../models/payment"); // Create a Payment model
const User = require("../models/User"); // Assuming User model exists



// Create a Razorpay order
router.post("/create-order", async (req, res) => {
    const { amount } = req.body;
  
    // Validate request data
    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }
  
    const options = {
      amount: amount, // Amount in paise
      currency: "INR",
      receipt: "order_receipt_" + Math.floor(Math.random() * 1000),
    };
  
    try {
      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      res.status(500).json({ 
        error: "Failed to create order",
        details: error.message || "Unknown error" 
      });
    }
  });

// Verify Razorpay payment
router.post("/verify-payment", async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, email, name } = req.body;
  
    // Verify payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");
  
    const isAuthentic = expectedSignature === razorpay_signature;
  
    if (isAuthentic) {
      try {
        // Store payment details in the "payment" collection
        const newPayment = new Payment({
          name,
          email,
          payment_id: razorpay_payment_id, // Changed to snake_case
          order_id: razorpay_order_id,      // Changed to snake_case
          paymentTime: new Date(),
        });
  
        await newPayment.save();
  
        // Update the user collection to mark the subscription as active
        await User.updateOne({ email }, { $set: { subscription: true } });
  
        res.json({ success: true, message: "Payment verified successfully" });
      } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ success: false, message: "Database error" });
      }
    } else {
      res.status(400).json({ success: false, message: "Payment verification failed" });
    }
  });


module.exports = router;