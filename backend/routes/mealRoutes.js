const express = require('express');
const { generateMealPlan } = require('../controllers/mealController');

const router = express.Router();

router.post('/meal-plan', generateMealPlan);

module.exports = router;