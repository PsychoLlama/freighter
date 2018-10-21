// @flow
import { spawn } from 'promisify-child-process';
import logger from '@freighter/logger';
import { ExitCode } from 'dispute';

import { hasWorkspaces } from './utils/workspaces';

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

export const test = async (options: Options) => {
  const repoPath = process.cwd();
  if (!(await hasWorkspaces(repoPath))) {
    logger.warn('No workspaces found. Skipping tests.');
    return;
  }

  const givenArgs = [];
  if (options.watch) {
    givenArgs.push('--watch', '--collectCoverage=false');
  }

  const args = [...givenArgs, '--color'];

  try {
    await spawn(JEST_PATH, args, CONFIG);
  } catch (error) {
    throw new ExitCode(error.code);
  }
};

export default {
  description: 'Run all the tests',
  command: test,
  options: {
    watch: {
      description: 'Automatically rerun tests when files change',
      usage: '--watch',
    },
  },
};
