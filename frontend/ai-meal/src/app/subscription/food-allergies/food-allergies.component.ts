import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-food-allergies',
  imports: [FormsModule],
  templateUrl: './food-allergies.component.html',
  styleUrl: './food-allergies.component.css'
})
export class FoodAllergiesComponent {
  allergies = {
    dairy: false,
    eggs: false,
    peanuts: false,
    treeNuts: false,
    shellfish: false,
    fish: false,
    wheat: false,
    soy: false
  };

  otherAllergies: string = '';

  constructor(private userDataService: UserDataService) {} // Inject the service

  // Called whenever any checkbox changes or textarea updates
  onAllergyChange() {
    this.saveAllergyData();
  }

  // Save data to UserDataService
  private saveAllergyData() {
    // Filter only selected allergies
    const selectedAllergies = Object.entries(this.allergies)
      .filter(([_, value]) => value)
      .map(([key, _]) => key);

    this.userDataService.setFoodAllergiesData({
      allergies: selectedAllergies,
      otherAllergies: this.otherAllergies
    });

    // For debugging - can be removed in production
    console.log('Allergy data saved:', {
      allergies: selectedAllergies,
      otherAllergies: this.otherAllergies
    });
  }
}
