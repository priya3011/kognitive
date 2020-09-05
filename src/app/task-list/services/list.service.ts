import { Injectable } from "@angular/core";
import { ListServiceState } from "../states/list.state";
import { BehaviorSubject, Observer } from "rxjs/index";
import { ListBackendService } from "./list-backend.service";
import { LoggerService } from "../../utilities/services/logger.service";
import { CookieService } from "ngx-cookie-service";
import { ListResponse, Task } from "../models/list.model";


export const initialListState: ListServiceState = {
  tasks: []
};

@Injectable({
    providedIn: "root"
})
export class ListService {
    private readonly state = new BehaviorSubject<ListServiceState>(
        initialListState
    );

    readonly list$ = this.state.asObservable();

    constructor(
        private backend: ListBackendService,
        private logger: LoggerService,
        private cookies: CookieService,
    ) {}

list() {
   this.backend.list().subscribe({
     next: (response: ListResponse) => {
       this.state.next(Object.assign({}, { ...this.state.getValue(), tasks: response.data }) as ListServiceState);
     },
     error: (reason) => {
       this.logger.error("Task List not loaded.");
     }
   } as Observer<any>);
 }

}
