// @flow
import { spawn } from 'promisify-child-process';
import fs from 'fs-extra';
import path from 'path';

import { command } from './decorator';
import console from '../console';

const git = {
  init: directory => spawn('git', ['init', '--quiet', directory]),
};

export default command(async (directory: string) => {
  const currentDirectory = process.cwd();
  const fullDirectoryPath = path.join(currentDirectory, directory);
  if (await fs.pathExists(fullDirectoryPath)) {
    const msg =
      'Hold on, that directory already exists.\n' +
      "'freighter init' expects a blank canvas of opportunity.";

    return console.error(msg);
  }

  await git.init(fullDirectoryPath);
  process.chdir(fullDirectoryPath);
});
