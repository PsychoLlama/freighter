#!/usr/bin/env node
/* istanbul ignore file */
// @flow
import freighter from './freighter';

const dieHelpfully = () => {
  freighter.outputHelp();
  process.exit(1);
};

// Invalid command name given.
freighter.action(dieHelpfully);

// No arguments passed. Punish them.
if (process.argv.length < 3) {
  dieHelpfully();
}

freighter.parse(process.argv);
