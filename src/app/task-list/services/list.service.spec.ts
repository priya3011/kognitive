import { getTestBed, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Observable, of } from "rxjs/index";
import { ListService, initialListState } from "./list.service";
import { ListServiceState } from "../states/list.state";
import { ListBackendService } from "./list-backend.service";
import { ListResponse, Task } from "../models/list.model";
import { taskMock, listResponseMock } from "../mocks/list-mock";
import { LoggerService } from "../../utilities/services/logger.service";
import { MockLoggerService } from "../../utilities/mocks/logger.mock";

describe("ListService", () => {
  let listService: ListService;
  let listBackendService: ListBackendService;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ListBackendService,
        ListService,
        { provide: LoggerService, useClass: MockLoggerService },
      ],
    }, );

    injector = getTestBed();
    listService = injector.inject(ListService);
    listBackendService = injector.inject(ListBackendService);

  });

  it("should be created", () => {
    expect(listService).toBeTruthy();
  });

  it("should have an list$ observable", (done: DoneFn) => {
    expect(listService.list$).toBeDefined();
    expect(listService.list$ instanceof Observable).toBeTruthy();

    listService.list$.subscribe(list => {
      expect(list).toEqual({ tasks: [  ] });
      done();
    });
  });


  describe("#list", () => {

    it("should be defined", () => {
      expect(listService.list).toBeDefined();
    });

    it("should call the backend service method", (done: DoneFn) => {

      const listSpy = spyOn(listBackendService, "list").and.returnValue(
        of(listResponseMock),
      );

      listService.list();
      expect(listSpy).toHaveBeenCalled();

      listService.list$.subscribe((state: ListServiceState) => {
        expect(state.tasks).toEqual(taskMock);
        expect(state).toEqual({ tasks: taskMock });
        done();
      });
    });
  });
});
