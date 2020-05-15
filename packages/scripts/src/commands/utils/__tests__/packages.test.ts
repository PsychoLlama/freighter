import fs from 'fs-extra';
import path from 'path';

import { listPackages, hasPackages } from '../packages';

jest.mock('fs-extra');

describe('packages', () => {
  const PROJECT = '/project/path';
  const makeProjectPath = (dir) => path.join(PROJECT, 'packages', dir);

  beforeEach(() => {
    const packages = ['pkg-1', 'pkg-2', 'README.md', 'empty-dir'];
    fs.readdir.mockResolvedValue(packages);

    // empty-dir doesn't have a package.json
    fs.pathExists.mockImplementation(async (pkg) => {
      switch (pkg) {
        case makeProjectPath('pkg-2/package.json'):
        case makeProjectPath('pkg-1/package.json'):
          return true;
        default:
          return false;
      }
    });
  });

  describe('listPackages', () => {
    it('queries the packages', async () => {
      await listPackages(PROJECT);

      expect(fs.readdir).toHaveBeenCalledWith(`${PROJECT}/packages`);
    });

    it('returns a list of file paths', async () => {
      const packages = await listPackages(PROJECT);

      expect(packages).toEqual(expect.any(Array));
    });

    it('returns a list of file paths', async () => {
      const packages = await listPackages(PROJECT);

      expect(packages).toEqual(expect.any(Array));
    });

    it('only includes paths that have a package.json', async () => {
      const packages = await listPackages(PROJECT);

      expect(packages).toEqual([
        makeProjectPath('pkg-1'),
        makeProjectPath('pkg-2'),
      ]);
    });
  });

  describe('hasPackages', () => {
    it('returns true if packages exist', async () => {
      await expect(hasPackages(PROJECT)).resolves.toBe(true);
    });

    it('returns false if packages do not exist', async () => {
      fs.readdir.mockResolvedValue([]);

      await expect(hasPackages(PROJECT)).resolves.toBe(false);
    });
  });
});
