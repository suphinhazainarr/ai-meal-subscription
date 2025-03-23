import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-age',
  imports:[FormsModule],
  templateUrl: './age.component.html',
  styleUrls: ['./age.component.css'],
})
export class AgeComponent {
  customAge: number | null = null;

  constructor(private router: Router) {}

  // Handle age range selection
  selectAgeRange(ageRange: string) {
    console.log('Selected age range:', ageRange);
    alert('Thank you! Your age range has been selected: ' + ageRange);
  }

  // Handle custom age submission
  submitCustomAge() {
    if (this.customAge && this.customAge > 0 && this.customAge <= 120) {
      console.log('Custom age entered:', this.customAge);
      alert('Thank you! Your age has been submitted: ' + this.customAge);
    } else {
      alert('Please enter a valid age between 1 and 120.');
    }
  }
}