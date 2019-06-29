// @flow
import { createCli } from 'dispute';

import init from './commands/init';
import pkg from '../package.json';

export default createCli({
  commandName: 'freighter',
  packageJson: pkg,
  cli: {
    subCommands: { init },
  },
});
