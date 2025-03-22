import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-city',
  imports: [CommonModule,FormsModule],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})
export class CityComponent {
  city: string = '';
  language: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // Save preferences (you can add your logic here)
    console.log('City:', this.city);
    console.log('Language:', this.language);

    // Navigate to the next step (e.g., weight)
    // this.router.navigate(['../weight'], { relativeTo: this.router.url });
  }
}
