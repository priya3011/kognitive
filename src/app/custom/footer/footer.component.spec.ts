import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MaterialModule } from "../../material/material.module";
import { FooterComponent } from "./footer.component";
import { LoggerService } from "../../utilities/services/logger.service";
import { MockLoggerService } from "../../utilities/mocks/logger.mock";

describe("FooterComponent", () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            MaterialModule
        ],
      declarations: [ FooterComponent ],
      providers: [
        { provide: LoggerService, useClass: MockLoggerService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
