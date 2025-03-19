import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
declare var Razorpay: any; // Declare Razorpay to avoid TypeScript errors

@Component({
  selector: 'app-payment',
  imports: [FormsModule ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  amount = 189900; // Razorpay amount in paise (1899 INR)

  proceedToPayment() {
    const options = {
      key: 'YOUR_RAZORPAY_KEY', // Replace with your Razorpay key
      amount: this.amount,
      currency: 'INR',
      name: 'HealthifySmart',
      description: 'Payment for your plan',
      image: 'assets/logo.png', // Add your logo
      handler: (response: any) => {
        alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
      },
      prefill: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#d32f2f'
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }
}
