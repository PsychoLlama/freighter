// @flow
import { createCli } from 'dispute';

import * as init from './commands/init';
import pkg from '../package.json';

export default createCli({
  commandName: 'freighter',
  packageJson: pkg,
  cli: {
    subCommands: { init },
  },
});
