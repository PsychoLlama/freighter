#!/usr/bin/env node
/* istanbul ignore file */
// @flow
import scripts from './scripts';

if (process.argv.length < 3) {
  scripts.help();
}

scripts.parse(process.argv);
