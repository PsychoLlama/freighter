import program from 'commander';

import init from './commands/init';
import pkg from '../package.json';

program.version(pkg.version);

program
  .command('init <project-name>')
  .description('Create a fancy monorepo')
  .action(init);

export default program;
