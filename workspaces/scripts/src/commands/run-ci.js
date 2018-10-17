// @flow
import { spawn } from 'promisify-child-process';
import logger from '@freighter/logger';
import { ExitCode } from 'dispute';
import flow from 'flow-bin';
import chalk from 'chalk';

import { test } from './run-tests';
import { lint } from './lint';

const printSuccess = (failed, title) => {
  const TITLE = title.toUpperCase();

  // Colors taken from Jest's default reporter style.
  const coloring = chalk.reset.inverse.bold;
  const msg = failed
    ? coloring.red(` ${TITLE} FAILED `)
    : coloring.green(` ${TITLE} PASSED `);

  logger.log(msg);
};

// Resolve true if the promise rejects, false otherwise.
const isNonZero = promise => promise.then(() => false, () => true);

const runCiSuite = async () => {
  logger.log('\n### Linting ###');
  const lintFailed = await isNonZero(lint({ fix: false }));

  logger.log('\n### Running Flow ###');
  const flowFailed = await isNonZero(spawn(flow, [], { stdio: 'inherit' }));

  logger.log('\n### Running tests ###');
  const testsFailed = await isNonZero(test({ watch: false }));

  logger.log('');
  printSuccess(lintFailed, 'lint ');
  printSuccess(flowFailed, 'flow ');
  printSuccess(testsFailed, 'tests');
  logger.log('');

  if (lintFailed || flowFailed || testsFailed) {
    throw new ExitCode(1);
  }
};

export default {
  command: runCiSuite,
};
