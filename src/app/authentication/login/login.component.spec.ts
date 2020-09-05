import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginComponent } from "./login.component";
import { MaterialModule } from "../../material/material.module";
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { LoggerService } from "../../utilities/services/logger.service";
import { AuthService } from "../services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs/index";
import { CookieService } from "ngx-cookie-service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";


describe("LoginComponent", () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    const formBuilder: FormBuilder = new FormBuilder();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ LoginComponent ],
            imports: [
                NoopAnimationsModule,
                HttpClientTestingModule,
                ReactiveFormsModule,
                MaterialModule,
                RouterTestingModule.withRoutes(
                    [{ path: "login", component: LoginComponent }]
                )
            ],
            providers: [
                CookieService,
                LoggerService,
                AuthService,
                FormBuilder,
                { provide: FormGroup, useValue: formBuilder },
                {
                    provide: ActivatedRoute,
                    useValue: { // Mock
                        queryParams: of(
                            {
                                returnUrl: "",
                            }
                        ),
                        params: of(
                            {}
                        )
                    }
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
    it("should have a isLoggedIn attribute", () => {
        expect(component.isLoggedIn).toBeDefined();
        expect(component.isLoggedIn).toBeFalsy();
    });
    it("should have a loading attribute", () => {
        expect(component.loading).toBeDefined();
        expect(component.loading).toBeFalsy();
    });
    it("should have a returnUrl attribute", () => {
        expect(component.returnUrl).toBeDefined();
        expect(component.returnUrl).toEqual("/");
    });
    it("Should loginForm is valid", () => {
      component.loginForm = formBuilder.group({
        employeeID: ["ABC", [Validators.required]],
        password: ["123P@ssword", [Validators.required]]
      });
      component.onSubmit();
      expect(component.loading).toBeTruthy();
    });

});
