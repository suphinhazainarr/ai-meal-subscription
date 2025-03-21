import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../services/payment.service';
import { Router } from '@angular/router';
declare var Razorpay: any; // Declare Razorpay to avoid TypeScript errors

@Component({
  selector: 'app-payment',
  imports: [FormsModule ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  amount = 189900; // Amount in paise (1899 INR)

  constructor(private paymentService: PaymentService,  private router: Router // Inject Router
  ) {}

  proceedToPayment() {
    const userData = JSON.parse(localStorage.getItem('user') || '{}'); // Retrieve user data from localStorage

    this.paymentService.createOrder(this.amount).subscribe(
      (order: any) => {
        const options = {
          key: 'rzp_test_HHljS06yKtL4hA', // Replace with your Razorpay API Key
          amount: order.amount, // Amount in paise
          currency: 'INR',
          order_id: order.id, // Use the order ID from the backend
          name: 'ai meal subscription',
          description: 'Payment for your plan',
          image: 'assets/logo.png', // Add your logo
          handler: (response: any) => {
            // Verify the payment only if the payment ID is present
            if (response.razorpay_payment_id) {
              alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
              this.verifyPayment(response);
            } else {
              alert('Payment failed or was not completed.');
            }
          },
          prefill: {
            name: userData.name, // Prefill customer name
            email: userData.email, // Prefill customer email
            contact: '9567303565' // Prefill customer phone number
          },
          theme: {
            color: '#d32f2f' // Customize the checkout theme
          },
           // UPI-specific configurations
      
        };

        const rzp = new Razorpay(options);
        rzp.open();
      },
      (error: any) => {
        console.error('Error creating order:', error);
        alert('An error occurred while creating the order.');
      }
    );
  }

  verifyPayment(response: any) {
    const userData = JSON.parse(localStorage.getItem('user') || '{}'); // Retrieve user data from localStorage
  
    if (!userData.email || !userData.name) {
      alert('User details not found!');
      return;
    }
  
    const paymentData = {
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_order_id: response.razorpay_order_id,
      razorpay_signature: response.razorpay_signature,
      email: userData.email,  
      name: userData.name,    
    };
  
    this.paymentService.verifyPayment(paymentData).subscribe(
      (result: any) => {
        if (result.success) {
          alert('Payment verified successfully! Subscription activated.');
          this.router.navigate(['/subscription-home']).then(() => {
            window.location.reload(); // Reload the page
          });
        } else {
          alert('Payment verification failed.');
          this.router.navigate(['/subscription-home']); // Update with your actual route

        }
      },
      (error: any) => {
        console.error('Error verifying payment:', error);
        alert('An error occurred while verifying the payment.');
      }
    );
  }

  

}
