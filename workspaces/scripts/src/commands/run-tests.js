// @flow
import { spawn } from 'promisify-child-process';

import { command } from './decorator';

export const CONFIG_FILE = require.resolve('../jest-monorepo-config');
export const JEST_PATH = require.resolve('jest/bin/jest');

export default command(async cmd => {
  const givenArgs = [
    cmd.watch && '--watch',
    cmd.watch && '--collectCoverage=false',
  ].filter(Boolean);

  const args = [...givenArgs, '--no-cache', '--color', '--config', CONFIG_FILE];

  try {
    await spawn(JEST_PATH, args, { stdio: 'inherit' });
  } catch (error) {
    process.exit(error.code);
  }
});
