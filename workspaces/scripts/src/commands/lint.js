// @flow
import { spawn } from 'promisify-child-process';
import eslintPkg from 'eslint/package.json';
import { ExitCode } from 'dispute';
import path from 'path';

import { hasWorkspaces } from './utils/workspaces';

// Don't try this at home, kids.
const eslintPath = path.dirname(require.resolve('eslint/package.json'));
export const ESLINT_BIN = path.join(eslintPath, eslintPkg.bin.eslint);

export const args = '[files...]';

export const options = {
  fix: { usage: '--fix' },
};

export const command = async function lint(
  options: { fix?: boolean },
  ...extraGlobPatterns: string[]
) {
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
    throw new ExitCode(error.code);
  }
};
