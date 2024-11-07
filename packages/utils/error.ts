import { isString } from "lodash-es";

class ClUIError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "ClUIError";
  }
}

function createClUIError(scope: string, msg: string) {
  return new ClUIError(`[${scope}]: ${msg}`);
}

export function throwError(scope: string, msg: string) {
  throw createClUIError(scope, msg);
}

export function debugWarn(error: Error): void;
export function debugWarn(scope: string, msg: string): void;
export function debugWarn(scope: string | Error, msg?: string): void {
  if (process.env.NODE_ENV !== "production") {
    const err = isString(scope) ? createClUIError(scope, msg!) : scope;
    console.warn(err);
  }
}
