import { BrowserModule } from "@angular/platform-browser";
import { NgModule, APP_INITIALIZER } from "@angular/core";

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
import { AppUpdateService } from "./utilities/services/app-update.service";
import { PromptComponent } from "./prompt/prompt.component";
import { PwaService } from "./utilities/services/pwa.service";

const initializer = (pwaService: PwaService) => () => pwaService.initPwaPrompt();

@NgModule({
  declarations: [
    AppComponent,
    PromptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ServiceWorkerModule.register("ngsw-worker.js", { enabled: environment.production })
  ],
  providers: [
      CookieService,
      AppUpdateService,
     { provide: LoggerService, useClass: ConsoleLoggerService },
     { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
     {provide: APP_INITIALIZER, useFactory: initializer, deps: [PwaService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
