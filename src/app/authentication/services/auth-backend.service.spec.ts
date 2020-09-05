import { TestBed, getTestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { environment } from "../../../environments/environment";
import { AuthBackendService } from "./auth-backend.service";
import { LoginResponse, LoginProps } from "../models/login.model";
import { LoggerService } from "../../utilities/services/logger.service";
import { MockLoggerService } from "../../utilities/mocks/logger.mock";
import { RouterTestingModule } from "@angular/router/testing";

const environmentPath = environment.serviceProvider;
const loginApi = `${environmentPath.baseUrl}${environmentPath.loginPath}`;

describe("AuthBackendService", () => {
  let injector: TestBed;
  let service: AuthBackendService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        AuthBackendService,
        { provide: LoggerService, useClass: MockLoggerService },
      ]
    });
    // inject service (which imports the HttpClient) and the Test Controller
    injector = getTestBed();
    service = injector.inject(AuthBackendService);
    httpTestingController = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    // to make sure that there are no outstanding requests
    httpTestingController.verify();
  });

  it("Authentication Service should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("#login", () => {

    it("should be defined", () => {
      expect(service.login).toBeDefined();
    });

    it("should login successfully", async () => {
      const responseObject = {
        user_token: "jdcbscbo29d0mc30c93",
        user_id: 32,
        timestamp: 17230678
      } as LoginResponse;

      const loginProps = {
        email: "test@email.com",
        password: "test@Password",
    } as LoginProps;

      service.login(loginProps).subscribe(
        (receivedResponse: any) => {
          expect(receivedResponse).toEqual(responseObject);
        },
      );
      const req = httpTestingController.expectOne(`${loginApi}`);
      expect(req.request.method).toBe("POST");
      req.flush(responseObject);
    });

    it("should fail", async () => {
      const loginProps = {
        email: "test",
        password: "test1@Pass",
      };
      const responseObject = {
        success: false,
        message: "email and password combination is wrong"
      };
      service.login(loginProps).subscribe(
        (receivedResponse: any) => {
        },
        (error: any) => {
          expect(error).toEqual(responseObject);
        }
      );
      const req = httpTestingController.expectOne(`${loginApi}`);
      expect(req.request.method).toBe("POST");
      req.flush(responseObject);
    });
  });
});
