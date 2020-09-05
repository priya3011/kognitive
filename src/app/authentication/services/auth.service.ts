import { Injectable } from "@angular/core";
import { AuthState } from "../states/auth-state";
import { BehaviorSubject, Observer } from "rxjs/index";
import { AuthBackendService } from "./auth-backend.service";
import { LoggerService } from "../../utilities/services/logger.service";
import { CookieService } from "ngx-cookie-service";
import { LoginProps, LoginResponse } from "../models/login.model";

const TOKEN_COOKIE_NAME = "_gat";

export const initialAuthState: AuthState = {
    isLoggedIn: null,
};

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private readonly state = new BehaviorSubject<AuthState>(
        initialAuthState
    );

    /** AuthState as an Observable */
    readonly auth$ = this.state.asObservable();

    constructor(
        private authBackend: AuthBackendService,
        private logger: LoggerService,
        private cookies: CookieService,
    ) {}

    login(user: LoginProps) {
        this.authBackend.login(user).subscribe({
            next: (response) => {
                this.logger.info(response);
                this.state.next({
                    isLoggedIn: this.getToken() !== "",
                });
            },
            error: (reason) => {
                this.state.next({
                    isLoggedIn: false,
                });
                this.logger.error(reason);
            }
        } as Observer<any>);
    }

    public getToken() {
        return this.cookies.check(TOKEN_COOKIE_NAME) ?
            this.cookies.get(TOKEN_COOKIE_NAME) :
            "";
    }
}
