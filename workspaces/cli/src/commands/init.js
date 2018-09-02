// @flow
import fs from 'fs-extra';
import path from 'path';

import { command } from './decorator';

export default command(async (directory: ?string) => {
  if (directory) {
    const currentDirectory = process.cwd();
    const fullDirectoryPath = path.join(currentDirectory, directory);
    await fs.mkdir(fullDirectoryPath);
  }
});
