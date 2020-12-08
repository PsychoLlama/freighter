import { createCli } from 'dispute';

import test from './commands/run-tests';
import lint from './commands/lint';
import ci from './commands/run-ci';

// TODO: remove typecast once dispute's types are more flexible.
export default (createCli as any)({
  commandName: 'freighter-scripts',
  packageJson: require('../package'),
  cli: {
    subCommands: { test, lint, ci },
  },
});
