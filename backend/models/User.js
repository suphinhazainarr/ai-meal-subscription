const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscription: { type: Boolean, default: false }, // Add subscription field
  role: { type: String, enum: ["user", "admin"], default: "user" }, // Add role

});

module.exports = mongoose.model("User", UserSchema);
