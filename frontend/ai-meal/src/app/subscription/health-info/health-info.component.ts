import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-health-info',
  imports: [FormsModule],
  templateUrl: './health-info.component.html',
  styleUrl: './health-info.component.css'
})
export class HealthInfoComponent {
  conditions = {
    diabetes: false,
    hypertension: false,
    heartDisease: false,
    celiac: false,
    ibs: false,
    lactose: false,
    gerd: false,
    kidney: false
  };

  otherConditions: string = '';
  constructor(private userDataService: UserDataService) {} // Inject the service

  // Called whenever any checkbox changes or textarea updates
  onHealthInfoChange() {
    this.saveHealthData();
  }

  // Save data to UserDataService
  private saveHealthData() {
    // Filter only selected conditions
    const selectedConditions = Object.entries(this.conditions)
      .filter(([_, value]) => value)
      .map(([key, _]) => key);

    this.userDataService.setHealthInfoData({
      conditions: selectedConditions,
      otherConditions: this.otherConditions
    });

    // For debugging - can be removed in production
    console.log('Health info saved:', {
      conditions: selectedConditions,
      otherConditions: this.otherConditions
    });
  }
}
