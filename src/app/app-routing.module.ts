import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
    {
        path: "",
        loadChildren: () => import("./authentication/authentication.module").then( m => m.AuthenticationModule)
    },
    {
        path: "taskList",
        loadChildren: () => import("./task-list/task-list.module").then( m => m.TaskListModule)
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
