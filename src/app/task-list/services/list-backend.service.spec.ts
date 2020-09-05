import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed, getTestBed } from "@angular/core/testing";
import { ListBackendService } from "./list-backend.service";
import { environment } from "../../../environments/environment";
import { ListResponse, Task } from "../models/list.model";
import { listResponseMock } from "../mocks/list-mock";

const environmentPath = environment.serviceProvider;
const listApi = `${environmentPath.baseUrl}${environmentPath.taskListPath}`;

describe("ListBackendService Service", () => {
  let injector: TestBed;
  let service: ListBackendService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ListBackendService
      ]
    });

    // inject service (which imports the HttpClient) and the Test Controller
    injector = getTestBed();
    service = injector.inject(ListBackendService);
    httpTestingController = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    // to make sure that there are no outstanding requests
    httpTestingController.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("#list", () => {

    it("should be defined", () => {
      expect(service.list).toBeDefined();
    });

    it("should return an Observable", async () => {
      service.list().subscribe(
        (receivedResponse: ListResponse) => {
          expect(receivedResponse.data.length).toBe(2);
          expect(receivedResponse).toEqual(listResponseMock);
        },
        (error: any) => {
        }
      );
      const req = httpTestingController.expectOne(`${listApi}`);
      expect(req.request.method).toBe("POST");
      req.flush(listResponseMock);
    });
  });
});
