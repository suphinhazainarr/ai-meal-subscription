import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sex',
  imports: [FormsModule],
  templateUrl: './sex.component.html',
  styleUrl: './sex.component.css'
})
export class SexComponent {
  selectedSex: string = '';

}
