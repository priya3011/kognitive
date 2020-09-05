import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { AuthGuard } from "../helpers/guards/auth.guard";

const routes: Routes = [
    {   path: "", component: ListComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaskListRoutingModule { }
