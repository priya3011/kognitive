import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
// import { AuthService } from "./services/auth.service";
import { MaterialModule } from "../material/material.module";
import { AuthenticationRoutingModule } from "./authentication-routing.module";

// TODO: This module may not be needed due to integration of OKTA SAML authentication
@NgModule({
  declarations: [
      LoginComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AuthenticationRoutingModule
  ],
  exports: [
      LoginComponent,
  ],
  providers: [
      // AuthService,
  ]
})
export class AuthenticationModule { }
