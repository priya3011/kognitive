import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { catchError, first } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthService } from "../../authentication/services/auth.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      switch (err.status) {
        case 401:
          console.log("i am in 401");
          this.router.navigate([""]);
          break;
        case 403:
          this.router.navigate([""]);
          break;
        default:
          break;
      }
      const errors = err.error.message || err.statusText;
      return throwError(errors);
    }));
  }
}
