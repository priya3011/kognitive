import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { MaterialModule } from "../material/material.module";
import { AuthenticationRoutingModule } from "./authentication-routing.module";


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
  ]
})
export class AuthenticationModule { }
