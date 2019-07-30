import logger from '@freighter/logger';
import { ExitCode } from 'dispute';
import chalk from 'chalk';

import { test } from './run-tests';
import { lint } from './lint';

const printSuccess = (failed: boolean, title: string) => {
  const TITLE = title.toUpperCase();

  // Colors taken from Jest's default reporter style.
  const coloring = chalk.reset.inverse.bold;
  const msg = failed
    ? coloring.red(` ${TITLE} FAILED `)
    : coloring.green(` ${TITLE} PASSED `);

  logger.log(msg);
};

// Resolve true if the promise rejects, false otherwise.
const isNonZero = <T>(promise: Promise<T>): Promise<boolean> =>
  promise.then(() => false, () => true);

const runCiSuite = async () => {
  logger.log('\n### Linting ###');
  const lintFailed = await isNonZero(lint({ fix: false }));

  logger.log('\n### Running tests ###');
  const testsFailed = await isNonZero(test({ watch: false }));

  logger.log('');
  printSuccess(lintFailed, 'lint ');
  printSuccess(testsFailed, 'tests');
  logger.log('');

  if (lintFailed || testsFailed) {
    throw new ExitCode(1);
  }
};

export default {
  description: 'Run code quality checks on the entire repo',
  command: runCiSuite,
};
