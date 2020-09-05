import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { AuthState } from "../states/auth-state";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Subject } from "rxjs/index";
import { takeUntil } from "rxjs/operators";
// TODO: This component may be deprecated due to integration of OKTA SAML authentication
@Component({
    selector: "app-auth-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy {
    private destroyed$: Subject<void> = new Subject();
    returnUrl: string;
    loginForm: FormGroup;
    isLoggedIn = false;
    userState: AuthState;
    loading = false;

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        ) { }

    get f() {
        return this.loginForm.controls;
    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
          employeeID: ["", Validators.required],
          password: ["", Validators.required]
        });

        this.route.params.subscribe( params => {
            this.returnUrl = params.returnUrl ? params.returnUrl : "/";
        });

        this.authService.auth$.pipe(takeUntil(this.destroyed$)).subscribe(
          state => {
              this.loading = false;
              this.userState = state;

              if (this.userState.isLoggedIn && this.isLoggedIn) {
                  this.router.navigate(["taskList"]);
              }
          }
        );
    }

    onSubmit() {
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authService.login({
            email: this.f.employeeID.value,
            password: this.f.password.value,
        });
        this.isLoggedIn = true;
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    }
}
