#!/usr/bin/env node
// @flow
import freighter from './freighter';

// No arguments passed. Punish them.
if (process.argv.length < 3) {
  freighter.help();
}

freighter.parse(process.argv);
