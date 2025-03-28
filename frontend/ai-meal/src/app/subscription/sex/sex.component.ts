import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-sex',
  imports: [FormsModule],
  templateUrl: './sex.component.html',
  styleUrl: './sex.component.css'
})
export class SexComponent {
  selectedSex: string = '';

  constructor(private userDataService: UserDataService) {} // Inject the service

  // This method will be called whenever the selection changes
  onSexChange() {
    if (this.selectedSex) {
      this.saveSexData();
    }
  }

  // Save data to UserDataService
  private saveSexData() {
    this.userDataService.setSexData({
      sex: this.selectedSex
    });
    
    // For debugging - can be removed in production
    console.log('Sex data saved:', this.selectedSex);
  }

}
