// @flow
import { spawn } from 'promisify-child-process';

import { command, exit } from './decorator';

export const JEST_PATH = require.resolve('jest/bin/jest');

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
    await spawn(JEST_PATH, args, { stdio: 'inherit' });
  } catch (error) {
    return exit(error.code);
  }
};

export default command(test);
