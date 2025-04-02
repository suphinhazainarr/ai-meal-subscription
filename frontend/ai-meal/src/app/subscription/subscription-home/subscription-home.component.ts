import { Component } from '@angular/core';
import { MealService } from '../../services/meal.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon'; // Add this import

@Component({
  selector: 'app-subscription-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,MatIconModule
  ],
  templateUrl: './subscription-home.component.html',
  styleUrls: ['./subscription-home.component.css']
})
export class SubscriptionHomeComponent {
  goals = ['Weight Loss', 'Weight Gain', 'Balanced Diet', 'Athlete'];
  selectedGoal = 'Weight Loss';
  mealPlan: any;
  isLoading = false;
  error: string | null = null;
  
  // Pagination
  currentWeekIndex = 0;
  weeks: string[] = [];
  pageSize = 1; // Show one week at a time
  pageSizeOptions = [1];

  constructor(private mealService: MealService) {}

  generatePlan() {
    this.isLoading = true;
    this.error = null;
    
    this.mealService.generateMealPlan(this.selectedGoal).subscribe({
      next: (response) => {
        this.mealPlan = response.plan;
        this.weeks = this.getWeeks();
        this.currentWeekIndex = 0;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.error?.error || 'Failed to generate meal plan';
        this.isLoading = false;
      }
    });
  }

  getWeeks(): string[] {
    return this.mealPlan ? Object.keys(this.mealPlan) : [];
  }

  getDays(): string[] {
    return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  }

  getMeals(): string[] {
    return ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  }

  onPageChange(event: PageEvent) {
    this.currentWeekIndex = event.pageIndex;
  }

  get currentWeek(): string | null {
    return this.weeks.length > 0 ? this.weeks[this.currentWeekIndex] : null;
  }
}