#!/usr/bin/env node
import freighter from './freighter';

// No arguments passed. Punish them.
if (process.argv.length < 3) {
  freighter.help();
}

freighter.parse(process.argv);
