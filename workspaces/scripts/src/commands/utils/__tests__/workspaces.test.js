// @flow
import fs from 'fs-extra';
import path from 'path';

import { listWorkspaces, hasWorkspaces } from '../workspaces';

jest.mock('fs-extra');

describe('workspaces', () => {
  const PROJECT = '/project/path';
  const makeProjectPath = dir => path.join(PROJECT, 'workspaces', dir);

  beforeEach(() => {
    const workspaces = ['pkg-1', 'pkg-2', 'README.md', 'empty-dir'];
    fs.readdir.mockResolvedValue(workspaces);

    // empty-dir doesn't have a package.json
    fs.pathExists.mockImplementation(async pkg => {
      switch (pkg) {
        case makeProjectPath('pkg-2/package.json'):
        case makeProjectPath('pkg-1/package.json'):
          return true;
        default:
          return false;
      }
    });
  });

  describe('listWorkspaces', () => {
    it('queries the workspaces', async () => {
      await listWorkspaces(PROJECT);

      expect(fs.readdir).toHaveBeenCalledWith(`${PROJECT}/workspaces`);
    });

    it('returns a list of file paths', async () => {
      const workspaces = await listWorkspaces(PROJECT);

      expect(workspaces).toEqual(expect.any(Array));
    });

    it('returns a list of file paths', async () => {
      const workspaces = await listWorkspaces(PROJECT);

      expect(workspaces).toEqual(expect.any(Array));
    });

    it('only includes paths that have a package.json', async () => {
      const workspaces = await listWorkspaces(PROJECT);

      expect(workspaces).toEqual([
        makeProjectPath('pkg-1'),
        makeProjectPath('pkg-2'),
      ]);
    });
  });

  describe('hasWorkspaces', () => {
    it('returns true if workspaces exist', async () => {
      await expect(hasWorkspaces(PROJECT)).resolves.toBe(true);
    });

    it('returns false if workspaces do not exist', async () => {
      fs.readdir.mockResolvedValue([]);

      await expect(hasWorkspaces(PROJECT)).resolves.toBe(false);
    });
  });
});
