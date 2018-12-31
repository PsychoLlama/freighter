// @flow
import { spawn } from 'promisify-child-process';

export default {
  commit: (msg: string) => spawn('git', ['commit', '-m', msg, '--no-verify']),
  init: (directory: string) => spawn('git', ['init', '--quiet', directory]),
  add: (files: string) => spawn('git', ['add', files]),
};
