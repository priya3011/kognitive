import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { LoggerService } from "../../utilities/services/logger.service";
import { throwError } from "rxjs/index";
import { environment } from "../../../environments/environment";
import { catchError } from "rxjs/internal/operators";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { LoginProps, LoginResponse } from "../models/login.model";
import { CookieService } from "ngx-cookie-service";

const TOKEN_COOKIE_NAME = "_gat";

@Injectable({
    providedIn: "root"
})
export class AuthBackendService {
    constructor(private http: HttpClient,
                private logger: LoggerService,
                private cookies: CookieService) {}

    private handleError = (error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
            this.logger.error("An error occurred:", error.error.message);
        } else {
            this.logger.error(
                `API returned error code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError("Something bad happened; please try again later.");

    }

    login(user: LoginProps) {
        const { baseUrl, loginPath, appToken } = environment.serviceProvider;
        const headers= new HttpHeaders()
            .set("apptoken", appToken )
            .set("Content-Type", "application/x-www-form-urlencoded");

        const userValue = new HttpParams({
            fromObject : {
                email: user.email,
                id_type: "email",
                password: user.password,
                tenantid: "3"
            }
        });
        if (baseUrl && loginPath) {
            return this.http.post<LoginResponse>(`${baseUrl}${loginPath}`, userValue, {
                headers,
                observe: "body",
            }).pipe(map(response => {
                const tokenName = "user_token";
                const timestampName = "timestamp";
                this.cookies.set(TOKEN_COOKIE_NAME, response[tokenName], response[timestampName], null, null, null, "Strict");
                return response;
            }),
                (catchError(this.handleError))
            );
        }

        return throwError("Invalid auth provider configuration.");

    }
}
