import os
from ml.meal_planner import GoalBasedMealPlanner

def initialize_planner():
    # Define paths relative to THIS script's location
    current_dir = os.path.dirname(os.path.abspath(__file__))
    data_path = os.path.join(current_dir, 'models', 'modified_diet_dataset.csv')
    save_path = os.path.join(current_dir, 'models', 'meal_planner_full.pkl')
    
    print(f"Initializing meal planner with data from: {data_path}")
    print(f"Will save trained planner to: {save_path}")
    
    # Create and save planner
    planner = GoalBasedMealPlanner.create_and_save_planner(
        data_path=data_path,
        save_path=save_path
    )
    
    print("Successfully initialized and saved meal planner!")
    return planner

if __name__ == '__main__':
    initialize_planner()