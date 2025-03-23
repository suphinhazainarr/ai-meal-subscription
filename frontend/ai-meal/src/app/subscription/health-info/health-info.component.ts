import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
}
