// @flow
const exitCodeKey = '__isExitCode';
let commandReturnValue;
let exitEnabled = false;

export const exit = (code: number) => ({ [exitCodeKey]: true, code });
export const isExitCode = (value: any) => Boolean(Object(value)[exitCodeKey]);
export const enableExit = (enabled: boolean) => (exitEnabled = enabled);

// Intercept and cache command return values. This is primarily
// to make unit testing easier while staying as close to the
// end user experience as possible.
export const command = <Command: Function>(handler: Command) => (
  ...args: *[]
) => {
  commandReturnValue = handler(...args);

  // Exit if a special return value is provided. Makes unit testing
  // and command composition easier.
  return Promise.resolve(commandReturnValue).then(result => {
    if (isExitCode(result) && exitEnabled) {
      process.exit(result.code);
    }
  });
};

export const testUtils = {
  resetCommandReturnValue: () => (commandReturnValue = undefined),
  getCommandReturnValue: () => commandReturnValue,
};
