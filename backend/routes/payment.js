const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const router = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Use environment variable for Razorpay key
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Use environment variable for Razorpay secret
});

// Create a Razorpay order
router.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount, // Amount in paise
    currency: "INR",
    receipt: "order_receipt_" + Math.floor(Math.random() * 1000),
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify Razorpay payment
router.post("/verify-payment", (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET) // Use environment variable for Razorpay secret
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    res.json({ success: true, message: "Payment verified successfully" });
  } else {
    res.status(400).json({ success: false, message: "Payment verification failed" });
  }
});

module.exports = router;