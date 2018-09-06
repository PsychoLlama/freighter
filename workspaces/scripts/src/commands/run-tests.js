// @flow
import { spawn } from 'promisify-child-process';

import { command, exit } from './decorator';

export const JEST_PATH = require.resolve('jest/bin/jest');
export const CONFIG = {
  stdio: 'inherit',
  env: {
    // Node's `Date` pulls timezone information from an env variable.
    // This defaults unit tests to UTC time.
    TZ: 'UTC',
  },
};

type Options = {
  watch: boolean,
};

export const test = async (cmd: Options) => {
  const givenArgs = [];
  if (cmd.watch) {
    givenArgs.push('--watch', '--collectCoverage=false');
  }

  const args = [...givenArgs, '--color'];

  try {
    await spawn(JEST_PATH, args, CONFIG);
  } catch (error) {
    return exit(error.code);
  }
};

export default command(test);
