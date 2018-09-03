// @flow
// Find and parse the monorepo's package.json.
import fs from 'fs-extra';
import path from 'path';

const CWD = process.cwd();

// If this function ends up being useful in more than one
// place, it might be worth extracting it to a dedicated package.
export default () => {
  const pkgPath = path.join(CWD, 'package.json');

  // If cwd() is ever different, this check will need
  // to become more elaborate.
  if (!fs.pathExistsSync(pkgPath)) {
    process.exit(1);
  }

  const contents = fs.readFileSync(pkgPath, 'utf8');
  return JSON.parse(contents);
};
