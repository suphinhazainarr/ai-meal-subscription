import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../services/payment.service';
declare var Razorpay: any; // Declare Razorpay to avoid TypeScript errors

@Component({
  selector: 'app-payment',
  imports: [FormsModule ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  amount = 189900; // Amount in paise (1899 INR)

  constructor(private paymentService: PaymentService) {}

  proceedToPayment() {
    this.paymentService.createOrder(this.amount).subscribe(
      (order: any) => {
        const options = {
          key: 'rzp_test_HHljS06yKtL4hA', // Replace with your Razorpay API Key
          amount: order.amount, // Amount in paise
          currency: 'INR',
          order_id: order.id, // Use the order ID from the backend
          name: 'HealthifySmart',
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
            name: 'John Doe', // Prefill customer name
            email: 'suphinhassainar2004@example.com', // Prefill customer email
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
    this.paymentService.verifyPayment(response).subscribe(
      (result: any) => {
        if (result.success) {
          alert('Payment verified successfully!');
        } else {
          alert('Payment verification failed.');
        }
      },
      (error: any) => {
        console.error('Error verifying payment:', error);
        alert('An error occurred while verifying the payment.');
      }
    );
  }

  

}
