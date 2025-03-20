import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaymentComponent } from './payment/payment.component';
import { SubscriptionHomeComponent } from './subscription/subscription-home/subscription-home.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { 
        path: 'home', 
        component: HomeComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Default child route

            { path: 'dashboard', component: DashboardComponent } // Dashboard as a child of Home
        ]
    },
    { path: 'signup', component: SignupComponent },
    { path: 'payment', component: PaymentComponent },
    { 
        path: 'subscription-home', 
        component: SubscriptionHomeComponent,
      },
    // Default route: Redirect to login if no other route is matched
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    // Wildcard route: Redirects unknown paths to login or 404 page
    { path: '**', redirectTo: 'login' }  ,

];
