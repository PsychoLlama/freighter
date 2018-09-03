// @flow
import program from 'commander';

import test from './commands/run-tests';
import lint from './commands/lint';
import pkg from '../package.json';

program.version(pkg.version);

program
  .command('test [...file-globs]')
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

export default program;
