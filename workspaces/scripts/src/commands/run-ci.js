// @flow
import { spawn } from 'promisify-child-process';
import logger from '@freighter/logger';
import flow from 'flow-bin';
import chalk from 'chalk';

import { command, exit, isExitCode } from './decorator';

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

export default command(async () => {
  logger.log('\n### Linting ###');
  const lintOutput = await lint({ fix: false });

  logger.log('\n### Running Flow ###');
  let flowOutput = await spawn(flow, [], { stdio: 'inherit' }).catch(error =>
    exit(error.code)
  );

  logger.log('\n### Running tests ###');
  const testOutput = await test({ watch: false });

  const lintFailed = isExitCode(lintOutput);
  const flowFailed = isExitCode(flowOutput);
  const testsFailed = isExitCode(testOutput);

  logger.log('');
  printSuccess(lintFailed, 'lint ');
  printSuccess(flowFailed, 'flow ');
  printSuccess(testsFailed, 'tests');
  logger.log('');

  if (lintFailed || flowFailed || testsFailed) {
    return exit(1);
  }

  return 12;
});
