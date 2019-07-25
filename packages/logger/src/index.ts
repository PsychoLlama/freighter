/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk from 'chalk';

type ConsoleImplementation = typeof global.console;

export const WARN_PREFIX = chalk.reset.yellow.bold('Warn:');
export const ERROR_PREFIX = chalk.reset.red.bold('Error:');

// Just like the built-in console, but won't spam your tests.
// Also, it uses chalk for maximum pretty.
export class Console {
  private _implementation: ConsoleImplementation;

  public constructor(implementation: ConsoleImplementation) {
    this._implementation = implementation;
  }

  // Just an FYI.
  public log(...args: any[]) {
    this._implementation.log(...args);
  }

  // Something doesn't look right.
  public warn(...args: any[]) {
    this._implementation.warn(WARN_PREFIX, ...args);
  }

  // Something failed horribly.
  public error(...args: any[]) {
    this._implementation.error(ERROR_PREFIX, ...args);
  }
}

export default new Console(console);
