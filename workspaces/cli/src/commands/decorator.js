let commandReturnValue;

export const command = handler => (...args) => {
  commandReturnValue = handler(...args);
  return commandReturnValue;
};

export const testUtils = {
  resetCommandReturnValue: () => (commandReturnValue = undefined),
  getCommandReturnValue: () => commandReturnValue,
};
