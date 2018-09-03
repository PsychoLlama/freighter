#!/usr/bin/env node
/* istanbul ignore file */
// @flow
import { enableExit } from './commands/decorator';
import scripts from './scripts';

if (process.argv.length < 3) {
  scripts.help();
}

enableExit(true);
scripts.parse(process.argv);
