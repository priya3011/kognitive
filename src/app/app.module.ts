import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "./material/material.module";
import { CookieService } from "ngx-cookie-service";
import { LoggerService } from "./utilities/services/logger.service";
import { ErrorInterceptor } from "./helpers/interceptors/error.interceptor";
import { AuthInterceptor } from "./helpers/interceptors/auth.interceptor";
import { ConsoleLoggerService } from "./utilities/services/console-logger.service";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ServiceWorkerModule.register("ngsw-worker.js", { enabled: environment.production }),
  ],
  providers: [
      CookieService,
     { provide: LoggerService, useClass: ConsoleLoggerService },
     { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
