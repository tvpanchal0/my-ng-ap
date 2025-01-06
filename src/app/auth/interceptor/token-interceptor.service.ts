import { HttpEvent, HttpHandler, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');  // Assuming 'authToken' is your key
    if (token) {
      console.log('Token found, adding to request headers');
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,  // Add token as Bearer token
        },
      });
    } else {
      console.log('No token found, proceeding without authorization header');
    }

    return next.handle(req);
  }
}
