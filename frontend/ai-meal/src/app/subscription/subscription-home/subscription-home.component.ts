import { Component } from '@angular/core';
import { MealService } from '../../services/meal.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subscription-home',
  imports: [CommonModule,FormsModule],
  templateUrl: './subscription-home.component.html',
  styleUrl: './subscription-home.component.css'
})
export class SubscriptionHomeComponent {
  goals = ['Weight Loss', 'Weight Gain', 'Balanced Diet', 'Athlete'];
  selectedGoal = 'Weight Loss';
  mealPlan: any;
  isLoading = false;
  error: string | null = null;

  constructor(private mealService: MealService) {}

  generatePlan() {
    this.isLoading = true;
    this.error = null;
    
    this.mealService.generateMealPlan(this.selectedGoal).subscribe({
      next: (response) => {
        this.mealPlan = response.plan;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.error?.error || 'Failed to generate meal plan';
        this.isLoading = false;
      }
    });
  }


  // Add to meal-planner.component.ts
getWeeks(): string[] {
  return this.mealPlan ? Object.keys(this.mealPlan) : [];
}

getDays(): string[] {
  return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
}

getMeals(): string[] {
  return ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
}

}
