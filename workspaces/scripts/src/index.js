#!/usr/bin/env node
/* istanbul ignore file */
// @flow
import { enableExit } from './commands/decorator';
import scripts from './scripts';

const dieHelpfully = () => {
  scripts.outputHelp();
  process.exit(1);
};

scripts.action(dieHelpfully);
if (process.argv.length < 3) {
  dieHelpfully();
}

enableExit(true);
scripts.parse(process.argv);
