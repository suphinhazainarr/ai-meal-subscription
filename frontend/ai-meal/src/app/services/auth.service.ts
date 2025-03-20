import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth'; // Base URL for auth endpoints
  private currentUser = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();

  }

  // auth.service.ts
private loadUserFromStorage() {
  const userData = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (userData && token) {
    try {
      const user = JSON.parse(userData);
      this.currentUser.next(user);

      // Ensure userId is sent in the request
      const userId = user.id; // Make sure this matches the key in localStorage
      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }

      // Verify subscription status with backend
      this.checkSubscription(userId).subscribe({
        error: (err) => console.error('Subscription check failed:', err)
      });
    } catch (e) {
      console.error('Failed to parse user data:', e);
      this.logout();
    }
  }
}

// Check subscription status with backend
checkSubscription(userId: string): Observable<any> {
  if (!userId) {
    return throwError(() => new Error('User ID is required'));
  }

  // Include userId in the request
  return this.http.get(`${this.apiUrl}/me`, { params: { userId } }).pipe(
    tap((updatedUser: any) => {
      // Update local storage and state
      const mergedUser = { ...this.currentUser.value, ...updatedUser };
      localStorage.setItem('user', JSON.stringify(mergedUser));
      this.currentUser.next(mergedUser);
    }),
    catchError((error) => {
      console.error('Subscription check failed:', error);
      return throwError(() => error);
    })
  );
}
hasSubscription(): boolean {
  return this.currentUser.value?.subscription === true;
}
getCurrentUser(): Observable<any> {
  return this.currentUser.asObservable();
}

isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}
  // Signup method
  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  // Login method
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      map((res: any) => {
        // Save token and user details in localStorage
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        return res;
      }),
      catchError((err) => {
        return throwError(() => new Error('Invalid email or password'));
      })
    );
  }

  // Logout method
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return false;  // Always return false to debug
  }

  
}