// @flow
import { testUtils } from './commands/decorator';
import scripts from './scripts';

export const cli = (...args: string[]) => {
  scripts.parse(['node', '/path/to/executable', ...args]);
  const result = testUtils.getCommandReturnValue();
  testUtils.resetCommandReturnValue();

  return result;
};
