// @flow
import { spawn } from 'promisify-child-process';
import eslintPkg from 'eslint/package.json';
import path from 'path';

import { command } from './decorator';

// Don't try this at home, kids.
const eslintPath = path.dirname(require.resolve('eslint/package.json'));
export const ESLINT_BIN = path.join(eslintPath, eslintPkg.bin.eslint);

export default command(async (...args) => {
  const extraFilePatterns = args.slice(0, -1);
  const options = args[args.length - 1];
  const eslintOptions = options.fix ? ['--fix'] : [];

  try {
    await spawn(
      ESLINT_BIN,
      ['workspaces/*/src/**/*.js', ...extraFilePatterns, ...eslintOptions],
      {
        stdio: 'inherit',
      }
    );
  } catch (error) {
    process.exit(error.code);
  }
});
