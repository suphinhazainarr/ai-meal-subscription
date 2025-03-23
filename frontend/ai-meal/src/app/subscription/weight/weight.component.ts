import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weight',
  imports: [CommonModule,FormsModule],
  templateUrl: './weight.component.html',
  styleUrl: './weight.component.css'
})
export class WeightComponent implements OnInit {
  selectedWeight: number = 70;
  weightOptions: number[] = [];

  constructor() {}

  ngOnInit(): void {
    this.generateWeightOptions();
  }

  // Generate weight options from 30kg to 200kg in increments of 0.5
  generateWeightOptions(): void {
    for (let i = 30; i <= 200; i += 0.5) {
      this.weightOptions.push(i);
    }
  }

  // Select a weight
  selectWeight(weight: number): void {
    this.selectedWeight = weight;
    this.scrollToSelectedWeight();
  }

  // Increment weight
  incrementWeight(): void {
    if (this.selectedWeight < 200) {
      this.selectedWeight += 0.5;
      this.scrollToSelectedWeight();
    }
  }

  // Decrement weight
  decrementWeight(): void {
    if (this.selectedWeight > 30) {
      this.selectedWeight -= 0.5;
      this.scrollToSelectedWeight();
    }
  }

  // Scroll to the selected weight
  scrollToSelectedWeight(): void {
    const weightSelector = document.getElementById('weightSelector');
    const selectedOption = document.getElementById(`weight-${this.selectedWeight}`);
    if (weightSelector && selectedOption) {
      weightSelector.scrollTop = selectedOption.offsetTop - weightSelector.offsetHeight / 2 + selectedOption.offsetHeight / 2;
    }
  }

  // Handle back button
  onBack(): void {
    alert('Going back to previous step');
  }

  // Handle next button
  onNext(): void {
    alert(`Weight selected: ${this.selectedWeight} kg`);
  }
}
