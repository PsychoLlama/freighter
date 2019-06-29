// @flow
import { createCli } from 'dispute';

import test from './commands/run-tests';
import lint from './commands/lint';
import ci from './commands/run-ci';
import pkg from '../package.json';

export default createCli({
  commandName: 'freighter-scripts',
  packageJson: pkg,
  cli: {
    subCommands: { test, lint, ci },
  },
});
