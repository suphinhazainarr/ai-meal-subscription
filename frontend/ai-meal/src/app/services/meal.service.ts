// src/app/services/meal.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private apiUrl = 'http://localhost:5000/api/meal-plan'; // Your Express endpoint

  constructor(private http: HttpClient) { }

  generateMealPlan(goal: string): Observable<any> {
    return this.http.post(this.apiUrl, { goal });
  }
}