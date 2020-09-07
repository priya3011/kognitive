import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ListService } from "../services/list.service";
import { ListComponent } from "./list.component";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { DatePipe } from "@angular/common";
import { LoggerService } from "../../utilities/services/logger.service";
import { MockLoggerService } from "../../utilities/mocks/logger.mock";
import { taskMock } from "../mocks/list-mock";

describe("ListComponent", () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
                HttpClientModule
            ],
      declarations: [ ListComponent ],
      providers: [
          ListService,
          DatePipe,
          { provide: LoggerService, useClass: MockLoggerService }
      ],
       schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("getTodaysDoneTasks() should return empty array", () => {
    component.allTasks = taskMock;
    expect(component.getTodaysDoneTasks()).toEqual([]);
  });
});
