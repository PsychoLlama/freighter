// @flow
import { spawn } from 'promisify-child-process';
import logger from '@freighter/logger';

import { hasWorkspaces } from './utils/workspaces';
import { command, exit } from './decorator';

export const JEST_PATH = require.resolve('jest/bin/jest');
export const CONFIG = {
  stdio: 'inherit',
  env: Object.assign({}, process.env, {
    // Node's `Date` pulls timezone information from an env variable.
    // This defaults unit tests to UTC time.
    TZ: 'UTC',
  }),
};

type Options = {
  watch: boolean,
};

export const test = async (cmd: Options) => {
  const repoPath = process.cwd();
  if (!(await hasWorkspaces(repoPath))) {
    logger.warn('No workspaces found. Skipping tests.');
    return;
  }

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
