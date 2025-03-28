import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-city',
  imports: [CommonModule,FormsModule],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})
export class CityComponent {
  city: string = '';
  language: string = '';

  constructor(private userDataService: UserDataService) {}

  // This will be called whenever any selection changes
  onSelectionChange() {
    if (this.city && this.language) {
      console.log(this.city , this.language)
      this.userDataService.setPage2Data({
        city: this.city,
        language: this.language
      });
    }
  }
}
