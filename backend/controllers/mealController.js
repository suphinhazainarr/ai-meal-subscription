const axios = require('axios');

exports.generateMealPlan = async (req, res) => {
  try {
    const response = await axios.post('http://localhost:5000/generate-meal-plan', {
      goal: req.body.goal
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Meal planning service unavailable'
    });
  }
};