import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TaskListRoutingModule } from "./task-list-routing.module";
import { ListComponent } from "./list/list.component";
import { MaterialModule } from "../material/material.module";
import { CustomModule } from "../custom/custom.module";

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    TaskListRoutingModule,
    MaterialModule,
    CustomModule
  ],
  exports: [
    ListComponent,
  ],
})
export class TaskListModule { }
