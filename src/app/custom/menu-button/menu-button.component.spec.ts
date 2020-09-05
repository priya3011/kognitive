import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MaterialModule } from "../../material/material.module";
import { MenuButtonComponent } from "./menu-button.component";

describe("MenuButtonComponent", () => {
  let component: MenuButtonComponent;
  let fixture: ComponentFixture<MenuButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            MaterialModule
        ],
      declarations: [ MenuButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
