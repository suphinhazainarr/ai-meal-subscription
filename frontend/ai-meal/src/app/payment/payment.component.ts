import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../services/payment.service';
import { Router } from '@angular/router';
import { UserDataService } from '../services/user-data.service';
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
  ,    private userDataService: UserDataService, // Inject UserDataService
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
    const userInfo = this.userDataService.getAllData(); // Get stored user data from UserDataService

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
          
          // **Save user data to the database**
          const userPersonalDetails = {
            user: userData.email,
            name: userData.name,
            age: userInfo.age?.age || userInfo.age, // Handle both cases
            weight: {
              value: userInfo.weight?.weight || userInfo.weight,
              unit: userInfo.weight?.unit || 'kg'
            },
            height: {
              value: userInfo.height?.height || userInfo.height,
              unit: userInfo.height?.unit || 'cm'
            },
            goal: userInfo.goal,
            sex: userInfo.sex?.sex || userInfo.sex,
            city: userInfo.city,
            language: userInfo.language,
            healthInfo: userInfo.healthInfo || { conditions: [], otherConditions: '' },
            foodAllergies: userInfo.foodAllergies || { allergies: [], otherAllergies: '' }
          };

          
          this.userDataService.saveUserDetails(userPersonalDetails).subscribe(
            (response) => {
              console.log('User personal details saved:', response);
            },
            (error) => {
              console.error('Error saving user personal details:', error);
            }
          );

          this.router.navigate(['/subscription-home']).then(() => {
            window.location.reload(); // Reload the page
          });
        } else {
          alert('Payment verification failed.');
          this.router.navigate(['/subscription-home']);
        }
      },
      (error: any) => {
        console.error('Error verifying payment:', error);
        alert('An error occurred while verifying the payment.');
      }
    );
  }

  

}
