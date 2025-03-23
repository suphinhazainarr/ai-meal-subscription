import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-height',
  imports: [CommonModule,FormsModule],
  templateUrl: './height.component.html',
  styleUrl: './height.component.css'
})
export class HeightComponent implements OnInit {

  selectedHeight: number = 170;
  heightOptions: number[] = [];

  constructor() {}

  ngOnInit(): void {
    this.generateHeightOptions();
  }

  // Generate height options from 100cm to 250cm in increments of 0.5
  generateHeightOptions(): void {
    for (let i = 100; i <= 250; i += 0.5) {
      this.heightOptions.push(i);
    }
  }

  // Select a height
  selectHeight(height: number): void {
    this.selectedHeight = height;
    this.scrollToSelectedHeight();
  }

  // Increment height
  incrementHeight(): void {
    if (this.selectedHeight < 250) {
      this.selectedHeight += 0.5;
      this.scrollToSelectedHeight();
    }
  }

  // Decrement height
  decrementHeight(): void {
    if (this.selectedHeight > 100) {
      this.selectedHeight -= 0.5;
      this.scrollToSelectedHeight();
    }
  }

  // Scroll to the selected height
  scrollToSelectedHeight(): void {
    const heightSelector = document.getElementById('heightSelector');
    const selectedOption = document.getElementById(`height-${this.selectedHeight}`);
    if (heightSelector && selectedOption) {
      heightSelector.scrollTop = selectedOption.offsetTop - heightSelector.offsetHeight / 2 + selectedOption.offsetHeight / 2;
    }
  }

  // Handle back button
  onBack(): void {
    alert('Going back to previous step');
  }

  // Handle next button
  onNext(): void {
    alert(`Height selected: ${this.selectedHeight} cm`);
  }
}
