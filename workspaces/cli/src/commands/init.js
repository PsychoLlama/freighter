import fs from 'fs-extra';
import path from 'path';

import { command } from './decorator';

export default command(async directory => {
  if (directory) {
    const fullDirectoryPath = path.join(process.cwd(), directory);
    await fs.mkdir(fullDirectoryPath);
  }
});
