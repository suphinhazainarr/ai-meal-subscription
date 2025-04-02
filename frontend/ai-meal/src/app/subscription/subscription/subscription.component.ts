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
  public routeOrder = ['page2', 'age', 'weight', 'height', 'sex', 'health-info', 'food-alergies'];
  public currentRouteIndex = 0;

  constructor(private router: Router, private route: ActivatedRoute) {}

  navigateNext() {
    if (this.currentRouteIndex < this.routeOrder.length - 1) {
      this.currentRouteIndex++;
      this.router.navigate([this.routeOrder[this.currentRouteIndex]], { relativeTo: this.route });
    } else {
      this.router.navigate(['/payment']);
    }
  }

  navigateBack() {
    if (this.currentRouteIndex > 0) {
      this.currentRouteIndex--;
      this.router.navigate([this.routeOrder[this.currentRouteIndex]], { relativeTo: this.route });
    }
  }

  showBackButton(): boolean {
    return this.currentRouteIndex > 0;
  }

  showNextButton(): boolean {
    return this.currentRouteIndex < this.routeOrder.length - 1;
  }

  showPaymentButton(): boolean {
    return this.currentRouteIndex === this.routeOrder.length - 1;
  }
}
