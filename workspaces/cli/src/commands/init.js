// @flow
import { spawn } from 'promisify-child-process';
import fs from 'fs-extra';
import path from 'path';

import { command } from './decorator';

const git = {
  init: directory => spawn('git', ['init', '--quiet', directory]),
};

export default command(async (directory: string) => {
  const currentDirectory = process.cwd();
  const fullDirectoryPath = path.join(currentDirectory, directory);
  if (await fs.pathExists(fullDirectoryPath)) return;

  await git.init(fullDirectoryPath);
  process.chdir(fullDirectoryPath);
});
