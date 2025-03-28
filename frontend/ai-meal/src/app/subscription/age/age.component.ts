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
    this.saveAgeData(ageRange);
  }

  // Handle custom age submission
  submitCustomAge() {
    if (this.customAge && this.customAge > 0 && this.customAge <= 120) {
      this.selectedAgeRange = `Custom: ${this.customAge}`;
      this.saveAgeData(this.customAge.toString());
    }
  }

  // Save data to UserDataService
  private saveAgeData(ageValue: string) {
    this.userDataService.setAgeData({
      ageRange: this.selectedAgeRange,
      exactAge: this.customAge,
      ageValue: ageValue
    });
    
    // For debugging - can be removed in production
    console.log('Age data saved:', {
      ageRange: this.selectedAgeRange,
      exactAge: this.customAge
    });
  }

}