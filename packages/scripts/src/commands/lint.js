// @flow
import { spawn } from 'promisify-child-process';
import eslintPkg from 'eslint/package.json';
import { ExitCode } from 'dispute';
import path from 'path';

import { hasPackages } from './utils/packages';

// Don't try this at home, kids.
const eslintPath = path.dirname(require.resolve('eslint/package.json'));
export const ESLINT_BIN = path.join(eslintPath, eslintPkg.bin.eslint);

export const lint = async (
  options: { fix?: boolean },
  ...extraGlobPatterns: string[]
) => {
  const eslintOptions = options.fix ? ['--fix'] : [];
  const repoPath = process.cwd();
  const globs = ['jest.config.js'];

  // If the developer hasn't created any packages yet, don't yell at them,
  // just move on peacefully.
  if (await hasPackages(repoPath)) {
    globs.push('packages/*/src/**/*.js');
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

export default {
  description: 'Lint all the files',
  args: '[files...]',
  command: lint,
  options: {
    fix: {
      description: 'Automatically fix simple problems',
      usage: '--fix',
    },
  },
};
