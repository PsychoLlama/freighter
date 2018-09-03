// @flow
import fs from 'fs-extra';
import path from 'path';

import loadRepoPackage from '../load-repo-package';
import scriptsPkg from '../../package.json';

jest.mock('fs-extra');

describe('load-repo-package', () => {
  beforeAll(() => {
    jest.spyOn(process, 'exit');
  });

  beforeEach(() => {
    jest.clearAllMocks();

    const pkgContentsString = JSON.stringify(scriptsPkg, null, 2) + '\n';
    fs.readFileSync.mockReturnValue(pkgContentsString);
    fs.pathExistsSync.mockReturnValue(true);
    process.exit.mockReturnValue(undefined);
  });

  afterAll(() => {
    process.exit.restore();
  });

  it('loads the package', () => {
    const pkg = loadRepoPackage();

    const pkgPath = path.join(process.cwd(), 'package.json');
    expect(fs.readFileSync).toHaveBeenCalledWith(pkgPath, 'utf8');
    expect(pkg).toEqual(scriptsPkg);
  });

  it('exits if the package cannot be found', () => {
    fs.pathExistsSync.mockReturnValue(false);
    loadRepoPackage();

    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
