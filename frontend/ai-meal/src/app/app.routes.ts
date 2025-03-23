import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaymentComponent } from './payment/payment.component';
import { SubscriptionHomeComponent } from './subscription/subscription-home/subscription-home.component';
import { authGuard } from './guards/auth.guard';
import { Page1Component } from './subscription/page1/page1.component';
import { CityComponent } from './subscription/city/city.component';
import { SubscriptionComponent } from './subscription/subscription/subscription.component';
import { AgeComponent } from './subscription/age/age.component';
import { WeightComponent } from './subscription/weight/weight.component';
import { HeightComponent } from './subscription/height/height.component';
import { SexComponent } from './subscription/sex/sex.component';
import { HealthInfoComponent } from './subscription/health-info/health-info.component';
import { FoodAllergiesComponent } from './subscription/food-allergies/food-allergies.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { 
        path: 'home', 
        component: HomeComponent,
        canActivate: [authGuard], // Protect home route

        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Default child route

            { path: 'dashboard', component: DashboardComponent } // Dashboard as a child of Home
        ]
    },
    { path: 'height', component: HeightComponent }, // Add this line

    { path: 'signup', component: SignupComponent },
    { path: 'payment', component: PaymentComponent },
    { path: 'page1', component: Page1Component },
    { path: 'page2', component: CityComponent },
    { path: 'subscription', component: SubscriptionComponent ,
        children: [
            { path: 'page2', component: CityComponent },
            { path: 'age', component: AgeComponent }, 
            { path: 'weight', component: WeightComponent
                
             }, // Add this line
             { path: 'height', component: HeightComponent }, // Add this line
             { path: 'sex', component: SexComponent }, // Add this line
             { path: 'health-info', component: HealthInfoComponent }, // Add this line
             { path: 'food-alergies', component: FoodAllergiesComponent }, // Add this line


        ]
    },


    { 
        path: 'subscription-home', 
        component: SubscriptionHomeComponent,
        canActivate: [authGuard]
      },
    // Default route: Redirect to login if no other route is matched
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    // Wildcard route: Redirects unknown paths to login or 404 page
    { path: '**', redirectTo: 'login' }  ,

];
