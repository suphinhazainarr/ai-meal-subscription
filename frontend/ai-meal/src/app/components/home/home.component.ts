import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isNavbarExpanded = false;

  ngOnInit() {
    console.log('HomeComponent initialized'); // Debugging
  }

  toggleNavbar() {
    this.isNavbarExpanded = !this.isNavbarExpanded;
    console.log('Navbar toggled:', this.isNavbarExpanded); // Debugging
  }
}
