const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  order_id: { type: String, required: true }, // Must match snake_case
  payment_id: { type: String, required: true }, // Must match snake_case
  email: { type: String, required: true },
  name: { type: String, required: true },
  paymentTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);