import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'signup', component: SignupComponent },
    
    // Default route: Redirect to login if no other route is matched
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    // Wildcard route: Redirects unknown paths to login or 404 page
    { path: '**', redirectTo: 'login' }  
];
