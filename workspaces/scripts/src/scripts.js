// @flow
import program from 'commander';

import test from './commands/run-tests';
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

export default program;
