import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'Welcome to the Home Page!';
 

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout(); // Call the logout method from AuthService
    this.router.navigate(['/auth/login']); // Navigate the user back to the login page
  }
  gotodashboard() {
    
    this.router.navigate(['/dashboard']); // Navigate the user back to the login page
  }
}
