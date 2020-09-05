/* tslint:disable:no-console */
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

import { Logger } from "./logger.service";

export const isDebugMode = environment.isDebugMode;

const noop = (): any => undefined;

@Injectable({
    providedIn: "root"
})
export class ConsoleLoggerService implements Logger {

    get info() {
        if (isDebugMode) {
            return console.info.bind(console);
        } else {
            return noop;
        }
    }

    get warn() {
        if (isDebugMode) {
            return console.warn.bind(console);
        } else {
            return noop;
        }
    }

    get error() {
        if (isDebugMode) {
            return console.error.bind(console);
        } else {
            return noop;
        }
    }

    get debug() {
        if (isDebugMode) {
            return console.debug.bind(console);
        } else {
            return noop;
        }
    }

    get log() {
        if (isDebugMode) {
            return console.log.bind(console);
        } else {
            return noop;
        }
    }

    invokeConsoleMethod(type: string, args?: any): void {
        const logFn = () => (console)[type] || console.log || noop;
        logFn.apply(console, [args]);
    }
}
