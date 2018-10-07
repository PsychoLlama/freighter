// @flow
import { spawn } from 'promisify-child-process';
import logger from '@freighter/logger';
import { FatalError } from 'dispute';
import flow from 'flow-bin';
import chalk from 'chalk';

import { command as test } from './run-tests';
import { command as lint } from './lint';

const printSuccess = (failed, title) => {
  const TITLE = title.toUpperCase();

  // Colors taken from Jest's default reporter style.
  const coloring = chalk.reset.inverse.bold;
  const msg = failed
    ? coloring.red(` ${TITLE} FAILED `)
    : coloring.green(` ${TITLE} PASSED `);

  logger.log(msg);
};

const isNonZero = promise => promise.then(() => false, () => true);

export const command = async function ci() {
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
    throw new FatalError('', 1);
  }
};
