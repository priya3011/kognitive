import { Injectable } from "@angular/core";

export abstract class Logger {

    info: any;
    warn: any;
    error: any;
    debug: any;
    log: any;
}

@Injectable({
    providedIn: "root"
})
export class LoggerService implements Logger {

    info: any;
    warn: any;
    error: any;
    debug: any;
    log: any;

    invokeConsoleMethod(type: string, args?: any): void {}
}
