import { testUtils } from './commands/decorator';
import freighter from './freighter';

export const cli = (...args) => {
  freighter.parse(['node', '/path/to/executable', ...args]);
  const result = testUtils.getCommandReturnValue();
  testUtils.resetCommandReturnValue();

  return result;
};
