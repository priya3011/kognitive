import { TestBed, getTestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AuthService, initialAuthState } from "./auth.service";
import { LoginResponse, LoginProps } from "../models/login.model";
import { AuthBackendService } from "./auth-backend.service";
import { CookieService } from "ngx-cookie-service";
import { Observable, of } from "rxjs/index";
import { AuthState } from "../states/auth-state";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { LoggerService } from "../../utilities/services/logger.service";
import { MockLoggerService } from "../../utilities/mocks/logger.mock";

describe("AuthService", () => {
  let injector: TestBed;
  let authService: AuthService;
  let authBackendService: AuthBackendService;
  let cookieService: CookieService;
  const router = {
    navigate: jasmine.createSpy("/")
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        AuthBackendService,
        AuthService,
        CookieService,
        { provide: Router, useValue: router },
        { provide: LoggerService, useClass: MockLoggerService }
      ]
    });
    // inject service (which imports the HttpClient) and the Test Controller
    injector = getTestBed();
    authService = injector.inject(AuthService);
    authBackendService = injector.inject(AuthBackendService);
    cookieService = injector.inject(CookieService);
  });

  it("should be created", () => {
    expect(authService).toBeTruthy();
  });

  it("should have an auth$ observable", (done: DoneFn) => {
    expect(authService.auth$).toBeDefined();
    expect(authService.auth$ instanceof Observable).toBeTruthy();

    authService.auth$.subscribe(state => {
      expect(state).toBe(initialAuthState);
      done();
    });
  });

  describe("#login", () => {
    it("should be defined", () => {
      expect(authService.login).toBeDefined();
    });

    it("should call the backend service method", (done: DoneFn) => {
      const responseObject = {
        user_token: "jdcbscbo29d0mc30c93",
        user_id: 32,
        timestamp: 17230678
      };

      const loginProps = {
        email: "test@email.com",
        password: "test@Password",
      };

      const loginSpy = spyOn(authBackendService, "login").and.returnValue(
        of(responseObject),
      );
      const token = "_gat";
      cookieService.set(token, "2378xb3x6", null, null, null, false);

      authService.login(loginProps);
      expect(loginSpy).toHaveBeenCalledWith(loginProps);

      authService.auth$.subscribe((state: AuthState) => {
        expect(state.isLoggedIn).toEqual(true);
        done();
      });
    });
  });
});
