import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import joblib
from collections import defaultdict
import os

class GoalBasedMealPlanner:
    def __init__(self, data_path='modified_diet_dataset.csv'):
        self.data = pd.read_csv(data_path)
        self.meal_categories = ['Breakfast', 'Lunch', 'Dinner', 'Snack']
        self.goals = ['Weight Loss', 'Weight Gain', 'Balanced Diet', 'Athlete']
        self.models = {}
        self.scalers = {}
        
        # Train separate models for each goal
        for goal in self.goals:
            self._train_model_for_goal(goal)
    
    def _train_model_for_goal(self, goal):
        goal_data = self.data[self.data['goal'] == goal].copy()
        
        # Feature engineering
        goal_data['protein_ratio'] = goal_data['protein_g'] / goal_data['calories']
        goal_data['carb_ratio'] = goal_data['carbs_g'] / goal_data['calories']
        goal_data['fat_ratio'] = goal_data['fat_g'] / goal_data['calories']
        
        features = ['calories', 'protein_g', 'carbs_g', 'fat_g', 
                   'protein_ratio', 'carb_ratio', 'fat_ratio']
        X = goal_data[features]
        y = goal_data['food_item']
        
        # Train-test split
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        # Scale features
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        
        # Train model
        model = RandomForestClassifier(n_estimators=100, random_state=42)
        model.fit(X_train_scaled, y_train)
        
        # Store model and scaler
        self.models[goal] = model
        self.scalers[goal] = scaler
    
    def generate_monthly_plan(self, goal='Weight Loss'):
        if goal not in self.goals:
            raise ValueError(f"Invalid goal. Choose from: {', '.join(self.goals)}")
            
        goal_data = self.data[self.data['goal'] == goal].copy()
        monthly_plan = {}
        used_meals = defaultdict(list)
        
        for week in range(1, 5):  # 4 weeks = 1 month
            weekly_plan = {}
            
            for day in ['Monday', 'Tuesday', 'Wednesday', 
                       'Thursday', 'Friday', 'Saturday', 'Sunday']:
                daily_meals = {}
                
                for meal_type in self.meal_categories:
                    available_meals = goal_data[
                        (goal_data['meal'] == meal_type) & 
                        (~goal_data['food_item'].isin(used_meals[week]))
                    ]
                    
                    if len(available_meals) == 0:
                        # Reset used meals for this week if no options left
                        used_meals[week] = [
                            m for m in used_meals[week] 
                            if goal_data[goal_data['food_item'] == m]['meal'].values[0] != meal_type
                        ]
                        available_meals = goal_data[goal_data['meal'] == meal_type]
                    
                    selected_meal = available_meals.sample(1).iloc[0]
                    daily_meals[meal_type] = {
                        'food_item': selected_meal['food_item'],
                        'calories': selected_meal['calories'],
                        'protein': selected_meal['protein_g'],
                        'carbs': selected_meal['carbs_g'],
                        'fats': selected_meal['fat_g'],
                        'goal_specific_note': self._get_goal_note(goal, selected_meal)
                    }
                    used_meals[week].append(selected_meal['food_item'])
                
                weekly_plan[day] = daily_meals
            
            monthly_plan[f'Week {week}'] = weekly_plan
        
        return monthly_plan
    
    def _get_goal_note(self, goal, meal):
        notes = {
            'Weight Loss': f"Low calorie ({meal['calories']}kcal), high protein",
            'Weight Gain': f"High calorie ({meal['calories']}kcal), balanced macros",
            'Balanced Diet': "Well-rounded nutritional profile",
            'Athlete': f"High protein ({meal['protein_g']}g), performance-focused"
        }
        return notes.get(goal, "")
    
    def display_plan(self, plan):
        for week, weekly_plan in plan.items():
            print(f"\n{week} Meal Plan")
            print("="*60)
            for day, meals in weekly_plan.items():
                print(f"\n{day}:")
                for meal_type, details in meals.items():
                    print(f"  {meal_type}: {details['food_item']}")
                    print(f"    Calories: {details['calories']} | Protein: {details['protein']}g")
                    print(f"    Carbs: {details['carbs']}g | Fats: {details['fats']}g")
                    print(f"    Note: {details['goal_specific_note']}")
          @staticmethod
    def create_and_save_planner(data_path='models/modified_diet_dataset.csv',
                              save_path='models/meal_planner_full.pkl'):
        """Static method to create and save a planner instance"""
        try:
            # Ensure directories exist
            os.makedirs(os.path.dirname(save_path), exist_ok=True)
            
            planner = GoalBasedMealPlanner(data_path)
            joblib.dump(planner, save_path)
            print(f"Successfully saved planner to {save_path}")
            return planner
        except Exception as e:
            print(f"Error creating/saving planner: {str(e)}")
            raise


if __name__ == '__main__':
    GoalBasedMealPlanner.create_and_save_planner()