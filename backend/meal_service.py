from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from ml.meal_planner import GoalBasedMealPlanner
import numpy as np

app = Flask(__name__)
CORS(app)

# Function to convert numpy types to native Python types
def convert_numpy_types(obj):
    if isinstance(obj, np.integer):
        return int(obj)
    elif isinstance(obj, np.floating):
        return float(obj)
    elif isinstance(obj, np.ndarray):
        return obj.tolist()
    elif isinstance(obj, dict):
        return {k: convert_numpy_types(v) for k, v in obj.items()}
    elif isinstance(obj, (list, tuple)):
        return [convert_numpy_types(item) for item in obj]
    return obj

# Load the meal planner model
meal_planner = joblib.load('models/meal_planner_full.pkl')

@app.route('/generate-meal-plan', methods=['POST'])
def generate_plan():
    if not request.is_json:
        return jsonify({"success": False, "error": "Request must be JSON"}), 400
        
    data = request.get_json()
    goal = data.get('goal')
    
    if not goal:
        return jsonify({"success": False, "error": "Goal parameter is required"}), 400
    
    try:
        # Generate the meal plan
        plan = meal_planner.generate_monthly_plan(goal=goal)
        
        # Convert all numpy types in the plan
        converted_plan = convert_numpy_types(plan)
        
        return jsonify({
            "success": True,
            "plan": converted_plan,
            "message": f"Meal plan generated for {goal}"
        })
    except Exception as e:
        # Log the full error for debugging
        app.logger.error(f"Error generating meal plan: {str(e)}", exc_info=True)
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Failed to generate meal plan"
        }), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)