const axios = require('axios');

exports.generateMealPlan = async (req, res) => {
  try {
    // Verify the request body
    if (!req.body || !req.body.goal) {
      return res.status(400).json({
        success: false,
        error: 'Goal parameter is required'
      });
    }

    const response = await axios.post('http://localhost:5001/generate-meal-plan', {
      goal: req.body.goal
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Meal service error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    res.status(error.response?.status || 500).json({
      success: false,
      error: error.response?.data?.error || 'Meal planning service unavailable',
      details: error.response?.data || error.message
    });
  }
};