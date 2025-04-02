const mongoose = require('mongoose');
const userPersonalDetailsSchema = new mongoose.Schema({
    user: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    weight: {
      value: { type: Number, required: true },
      unit: { type: String, default: 'kg' }
    },
    height: {
      value: { type: Number, required: true },
      unit: { type: String, default: 'cm' }
    },
    goal: { type: String, },
    sex: { type: String, required: true },
    city: { type: String },
    language: { type: String },
    healthInfo: {
      conditions: [{ type: String }],
      otherConditions: { type: String, default: '' }
    },
    foodAllergies: {
      allergies: [{ type: String }],
      otherAllergies: { type: String, default: '' }
    }
  });
module.exports = mongoose.model('UserPersonalDetails', userPersonalDetailsSchema);
