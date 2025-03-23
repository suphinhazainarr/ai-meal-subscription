import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-subscription',
  imports:[RouterOutlet,CommonModule],
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
})
export class SubscriptionComponent {
  // Define the order of child routes
  public  routeOrder = ['page2', 'age', 'weight', 'height','sex','alergy'];
  public  currentRouteIndex = 0;

  constructor(private router: Router, private route: ActivatedRoute) {}

  // Navigate to the next child route
  navigateNext() {
    if (this.currentRouteIndex < this.routeOrder.length - 1) {
      this.currentRouteIndex++;
      this.router.navigate([this.routeOrder[this.currentRouteIndex]], { relativeTo: this.route });
    }
  }

  // Navigate to the previous child route
  navigateBack() {
    if (this.currentRouteIndex > 0) {
      this.currentRouteIndex--;
      this.router.navigate([this.routeOrder[this.currentRouteIndex]], { relativeTo: this.route });
    }
  }

  // Show the "Back" button if not on the first route
  showBackButton(): boolean {
    return this.currentRouteIndex > 0;
  }

  // Show the "Next" button if not on the last route
  showNextButton(): boolean {
    return this.currentRouteIndex < this.routeOrder.length - 1;
  }
}