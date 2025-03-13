import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { SignupComponent } from './components/auth//signup/signup.component';

@Component({
  selector: 'app-root',
  imports: [SignupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ai-meal';
}
