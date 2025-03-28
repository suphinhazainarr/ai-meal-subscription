import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-height',
  imports: [CommonModule,FormsModule],
  templateUrl: './height.component.html',
  styleUrl: './height.component.css'
})
export class HeightComponent implements OnInit {

  selectedHeight: number = 170;
  heightOptions: number[] = [];

  constructor(private userDataService: UserDataService) {} // Inject the service

  ngOnInit(): void {
    this.generateHeightOptions();
    this.saveHeightData(); // Save initial height
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
    this.saveHeightData(); // Save when height changes
  }

  // Increment height
  incrementHeight(): void {
    if (this.selectedHeight < 250) {
      this.selectedHeight += 0.5;
      this.scrollToSelectedHeight();
      this.saveHeightData(); // Save when height changes
    }
  }

  // Decrement height
  decrementHeight(): void {
    if (this.selectedHeight > 100) {
      this.selectedHeight -= 0.5;
      this.scrollToSelectedHeight();
      this.saveHeightData(); // Save when height changes
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

  // Save height data to UserDataService
  private saveHeightData(): void {
    this.userDataService.setHeightData({
      height: this.selectedHeight,
      unit: 'cm'
    });
    
    // For debugging - can be removed in production
    console.log('Height saved:', this.selectedHeight);
  }
}
