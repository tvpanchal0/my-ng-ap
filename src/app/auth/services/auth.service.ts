import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment  } from '../../../environments/environment'; 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl
  private tokenKey = environment.tokenKey; // For storing the auth token in localStorage

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
  }

  refreshToken(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/refresh`, {});
  }

  // Save the token to localStorage after a successful login
  saveToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  // Get the stored token from localStorage
  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.tokenKey);
    }
    return null; // Return null if localStorage is not available
  }

  isLoggedIn(): boolean {
    return this.isBrowser() && !!localStorage.getItem(this.tokenKey); // Check if in browser and token exists
  }

  // Log out the user and remove the token
  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.tokenKey);
    }
  }

  // Helper function to check if the environment is a browser
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;  // Ensure this returns a boolean
  }
}
