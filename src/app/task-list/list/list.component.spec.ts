import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ListService } from "../services/list.service";
import { ListComponent } from "./list.component";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { NO_ERRORS_SCHEMA } from "@angular/core";

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
          ListService
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
  // it("getTodaysDoneTasks()", () => {
  //   component.allTasks
  //   component.onSubmit();
  //   expect(component.loading).toBeTruthy();
  // });
});
