// @flow
import { createCli } from 'dispute';

import * as test from './commands/run-tests';
import * as lint from './commands/lint';
import * as ci from './commands/run-ci';
import pkg from '../package.json';

export default createCli({
  commandName: 'freighter-scripts',
  packageJson: pkg,
  cli: {
    subCommands: { test, lint, ci },
  },
});
