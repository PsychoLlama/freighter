// @flow
import program from 'commander';

import test from './commands/run-tests';
import runCi from './commands/run-ci';
import lint from './commands/lint';
import pkg from '../package.json';

program.version(pkg.version);

program
  .command('test')
  .description('Run every test in the monorepo')
  .option(
    '--watch',
    'Watch files for changes and rerun tests related to changed files.'
  )
  .action(test);

program
  .command('lint')
  .description('Lint every source file in the monorepo')
  .option('--fix', 'Automatically fix problems where possible')
  .action(lint);

program
  .command('ci')
  .description('Run all automated tests in a CI-friendly way')
  .action(runCi);

export default program;
