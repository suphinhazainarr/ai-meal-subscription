import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-age',
  imports:[FormsModule],
  templateUrl: './age.component.html',
  styleUrls: ['./age.component.css'],
})
export class AgeComponent {
  customAge: number | null = null;
  selectedAgeRange: string | null = null;

  constructor(
    private userDataService: UserDataService,
    private router: Router
  ) {}

  // Handle age range selection
  selectAgeRange(ageRange: string) {
    this.selectedAgeRange = ageRange;
    this.customAge = null; // Clear custom age if range is selected
    
    // Extract numerical value from range
    const ageValue = this.extractAgeValue(ageRange);
    this.saveAgeData(ageValue);
  }

  // Handle custom age submission
  submitCustomAge() {
    if (this.customAge && this.customAge > 0 && this.customAge <= 120) {
      this.selectedAgeRange = null; // Clear range selection
      this.saveAgeData(this.customAge);
    }
  }

  // Extract numerical value from range
  private extractAgeValue(ageRange: string): number {
    if (ageRange === 'Under 12') return 11; // Example value
    if (ageRange === '75+') return 75; // Example value
    
    // For ranges like "12-17", take the midpoint
    if (ageRange.includes('-')) {
      const [min, max] = ageRange.split('-').map(Number);
      return Math.floor((min + max) / 2);
    }
    
    return 0; // Fallback (shouldn't happen)
  }

  // Save only the numerical age value
  private saveAgeData(ageValue: number) {
    this.userDataService.setAgeData({
      age: ageValue
    });
    
    console.log('Age saved:', ageValue); // Debug log
  }

}