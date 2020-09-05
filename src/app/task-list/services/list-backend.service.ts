import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { LoggerService } from "../../utilities/services/logger.service";
import { throwError } from "rxjs/index";
import { environment } from "../../../environments/environment";
import { catchError } from "rxjs/internal/operators";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { ListResponse } from "../models/list.model";
import { CookieService } from "ngx-cookie-service";


@Injectable({
  providedIn: "root"
})
export class ListBackendService {
  constructor(private http: HttpClient,
    private logger: LoggerService,
    private cookies: CookieService) { }

  private handleError = (error: HttpErrorResponse) => {
    if (error.error instanceof ErrorEvent) {
      this.logger.error("An error occurred:", error.error.message);
    } else {
      this.logger.error(
        `API returned error code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");

  }


  list() {
    const { baseUrl, taskListPath, appToken } = environment.serviceProvider;

    if (baseUrl && taskListPath) {
      return this.http.post<ListResponse>(`${baseUrl}${taskListPath}`, {
        observe: "body",
      })
        .pipe(catchError(this.handleError));
    }
    return throwError({ message: "Invalid service provider configuration." });
  }
}
