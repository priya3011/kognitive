import { Injectable } from "@angular/core";
import { Logger } from "../services/logger.service";

const noop = (): any => undefined;

@Injectable({
  providedIn: "root"
})
export class MockLoggerService implements Logger {

    get info() {
        return noop;
    }

    get warn() {
        return noop;
    }

    get error() {
        return noop;
    }

    get debug() {
        return noop;
    }

    get log() {
        return noop;
    }
}
