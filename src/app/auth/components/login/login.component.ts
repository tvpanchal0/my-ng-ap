import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService,private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        if (response.token) {
          this.authService.saveToken(response.token);  // Save the token only if it's present
        }
        this.router.navigate(['/home']);  // Redirect to home page
      },
      error: (error) => {
        if (error.status === 400) {
          // Handle 400 error (Bad Request)
          console.error('Bad Request: ', error.error);  // Log the error message from the server
          alert('Invalid email or password');  // Show a user-friendly message
        } else {
          // Handle other errors (e.g., server errors)
          console.error('Login failed: ', error);
          alert('An error occurred. Please try again later.');
        }
      },
    });
  }
  
  
}
