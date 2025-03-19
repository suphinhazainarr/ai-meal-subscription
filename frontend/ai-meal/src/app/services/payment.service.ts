import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:5000/api/payment'; // Match the backend route prefix

  constructor(private http: HttpClient) {}

  // Create a Razorpay order
  createOrder(amount: number) {
    return this.http.post(`${this.apiUrl}/create-order`, { amount });
  }

  // Verify a Razorpay payment
  verifyPayment(paymentResponse: any) {
    return this.http.post(`${this.apiUrl}/verify-payment`, paymentResponse);
  }}
