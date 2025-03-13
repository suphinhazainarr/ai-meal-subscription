import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Provides this service at the root level
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth/signup'; 

  constructor(private http: HttpClient) {}

  // Signup method
  signup(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
}
