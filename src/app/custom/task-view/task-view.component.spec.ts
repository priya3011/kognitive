import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MaterialModule } from "../../material/material.module";
import { TaskViewComponent } from "./task-view.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("TaskViewComponent", () => {
  let component: TaskViewComponent;
  let fixture: ComponentFixture<TaskViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            MaterialModule
        ],
      declarations: [ TaskViewComponent ],
       schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("getDueDate()", () => {
    expect(component.getDueDate("2020-09-07")).toEqual("Today at 12:00 AM");
  });
});
