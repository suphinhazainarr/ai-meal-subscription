from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)
meal_planner = joblib.load('models/meal_planner_full.pkl')

@app.route('/generate-meal-plan', methods=['POST'])
def generate_plan():
    data = request.json
    goal = data.get('goal', 'Weight Loss')
    
    try:
        plan = meal_planner.generate_monthly_plan(goal=goal)
        return jsonify({"success": True, "plan": plan})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

if __name__ == '__main__':
    app.run(port=5000)