import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },

    { path: 'home', component: HomeComponent },
    { path: 'signup', component: SignupComponent },
    { path: '', redirectTo: '/signup', pathMatch: 'full' }  // Default route
];
