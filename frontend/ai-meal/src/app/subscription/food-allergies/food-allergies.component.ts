import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
}
