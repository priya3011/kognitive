import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../../authentication/services/auth.service";
import { environment } from "../../../environments/environment";

// This interceptor will send the cookies to all SP API requests if the token cookie exists
@Injectable({
  providedIn: "root"
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const { baseUrl, loginPath, appToken } = environment.serviceProvider;

    if (request.url.includes(loginPath)) {
            return next.handle(request);
    }
    const token = this.authenticationService.getToken();

    if (token && request.url.includes(baseUrl)) {
          request = request.clone({
            setHeaders: {
              "usertoken": `${token}`,
              "apptoken": `${appToken}`
            }
          });
    }

    return next.handle(request);
  }
}
