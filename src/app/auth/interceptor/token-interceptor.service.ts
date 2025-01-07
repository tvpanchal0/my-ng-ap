import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    let clonedReq = req;

    if (token) {
      clonedReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // If the token is expired, refresh it
          return this.authService.refreshToken().pipe(
            switchMap((response) => {
              this.authService.saveToken(response.token);
              const retryReq = clonedReq.clone({
                setHeaders: { Authorization: `Bearer ${response.token}` },
              });
              return next.handle(retryReq);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
