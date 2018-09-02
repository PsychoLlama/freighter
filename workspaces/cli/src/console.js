// @flow
import chalk from 'chalk';

type ConsoleImplementation = typeof global.console;

export const WARN_PREFIX = chalk.reset.yellow.bold('WARN:');
export const ERROR_PREFIX = chalk.reset.red.bold('Error:');

// Just like the built-in console, but won't spam your tests.
// Also, it uses chalk for maximum pretty.
export class Console {
  _implementation: ConsoleImplementation;

  constructor(implementation: ConsoleImplementation) {
    this._implementation = implementation;
  }

  // Just an FYI.
  log(...args: any[]) {
    this._implementation.log(...args);
  }

  // Something doesn't look right.
  warn(...args: any[]) {
    this._implementation.warn(WARN_PREFIX, ...args);
  }

  // Something failed horribly.
  error(...args: any[]) {
    this._implementation.error(ERROR_PREFIX, ...args);
  }
}

export default new Console(console);
