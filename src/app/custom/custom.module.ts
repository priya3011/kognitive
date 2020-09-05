import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material/material.module";
import { FooterComponent } from "./footer/footer.component";
import { TaskViewComponent } from "./task-view/task-view.component";
import { HeaderComponent } from "./header/header.component";
import { MenuButtonComponent } from "./menu-button/menu-button.component";

@NgModule({
  declarations: [FooterComponent, TaskViewComponent, HeaderComponent, MenuButtonComponent],
  imports: [
    CommonModule,
    MaterialModule
],
exports: [FooterComponent, TaskViewComponent, HeaderComponent, MenuButtonComponent],
})
export class CustomModule { }
