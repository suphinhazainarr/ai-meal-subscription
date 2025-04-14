import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getAccessToken(): string | null {
    try {
      return sessionStorage.getItem('token');
    } catch (error) {
      console.error('Error accessing sessionStorage:', error);
      return null;
    }
  }

  // auth.service.ts
private loadUserFromStorage() {

  const userData = localStorage.getItem('user');
  const token = this.getAccessToken(); // Use the method we just added

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

  // Signup method
  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  // Login method
 login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }, {
      withCredentials: true // Required for HTTP-only cookies
    }).pipe(
      tap((response: any) => {
        // Store only the access token in memory (not localStorage)
        this.setAuthData(response.token, response.user);
      }),
      catchError((err) => {
        return throwError(() => new Error(err.error.message || 'Login failed'));
      })
    );
  }

  private setAuthData(token: string, user: any) {
    // Store user in localStorage (safe)
    localStorage.setItem('user', JSON.stringify(user));
    
    // Store token in memory (better security)
    // In a real app, consider using Angular's TransferState or a service variable
    sessionStorage.setItem('token', token); // Better than localStorage
    
    this.currentUser.next(user);
    
    // Set default auth header
    this.setAuthHeader(token);
  }

  private setAuthHeader(token: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    // You'll need to ensure all authenticated requests use these headers
  }

  logout() {
    // Clear all auth data
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    this.currentUser.next(null);
    
    // Also call backend logout if you have that endpoint
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true });
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser.asObservable();
  }

  isLoggedIn(): boolean {
    return !!this.currentUser.value;
  }

  // Add token refresh method
  refreshToken(): Observable<any> {
    return this.http.post(`${this.apiUrl}/refresh-token`, {}, { 
      withCredentials: true 
    }).pipe(
      tap((response: any) => {
        this.setAuthHeader(response.accessToken);
      })
    );
  }
  // Check if user is authenticated
  isAuthenticated(): boolean {
    return false;  // Always return false to debug
  }

  
}