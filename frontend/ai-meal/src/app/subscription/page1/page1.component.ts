import { Component } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page1',
  imports: [],
  templateUrl: './page1.component.html',
  styleUrl: './page1.component.css'
})
export class Page1Component {
  constructor(
    private userDataService: UserDataService,
    private router: Router
  ) {}

  selectGoal(goal: string) {
    this.userDataService.setGoal(goal);
    console.log('Selected goal:', goal);
    this.router.navigate(['/subscription/page2']); // Navigate to next page
  }
}
