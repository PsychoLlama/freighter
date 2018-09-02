// @flow
let commandReturnValue;

// Intercept and cache command return values. This is primarily
// to make unit testing easier while staying as close to the
// end user experience as possible.
export const command = <Command: Function>(handler: Command) => (
  ...args: *[]
) => {
  commandReturnValue = handler(...args);
  return commandReturnValue;
};

export const testUtils = {
  resetCommandReturnValue: () => (commandReturnValue = undefined),
  getCommandReturnValue: () => commandReturnValue,
};
