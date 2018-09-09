// @flow
import { spawn } from 'promisify-child-process';
import eslintPkg from 'eslint/package.json';
import path from 'path';

import { hasWorkspaces } from './utils/workspaces';
import { command, exit } from './decorator';

// Don't try this at home, kids.
const eslintPath = path.dirname(require.resolve('eslint/package.json'));
export const ESLINT_BIN = path.join(eslintPath, eslintPkg.bin.eslint);

export const lint = async (...args: any) => {
  const extraGlobPatterns = args.slice(0, -1);
  const options = args[args.length - 1];
  const eslintOptions = options.fix ? ['--fix'] : [];
  const repoPath = process.cwd();
  const globs = ['jest.config.js'];

  // If the developer hasn't created any workspaces yet,
  // don't yell at them, just move on peacefully.
  if (await hasWorkspaces(repoPath)) {
    globs.push('workspaces/*/src/**/*.js');
  }

  try {
    await spawn(
      ESLINT_BIN,
      [...globs, ...extraGlobPatterns, ...eslintOptions],
      {
        stdio: 'inherit',
      }
    );
  } catch (error) {
    return exit(error.code);
  }
};

export default command(lint);
