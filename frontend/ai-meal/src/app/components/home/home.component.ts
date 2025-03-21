import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isNavbarExpanded = false;
  userName: string | null = null; // Variable to store the username

  ngOnInit() {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.userName = user.name; // Assign the username
    }
  }
  toggleNavbar() {
    this.isNavbarExpanded = !this.isNavbarExpanded;
    console.log('Navbar toggled:', this.isNavbarExpanded); // Debugging
  }
}
